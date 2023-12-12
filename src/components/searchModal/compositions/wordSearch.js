import { ref, toValue } from 'vue';

const baseUrl = '/search/language/v1/search.json?cate=lan';

async function useWordSearch(searchWord, searchCases) {
  const searchWordToValue = toValue(searchWord);
  const data = ref(null);
  const searchCase = ref(null);
  const error = ref(null);
  const { CASE_NORMAL, CASE_MISSING, CASE_SIMILAR } = searchCases;

  const checkNormalCase = (words) => {
    return words.toLowerCase() === searchWordToValue.toLowerCase();
  };

  const fetchData = async (searchWord) => {
    data.value = null;
    searchCase.value = null;
    error.value = null;

    await fetch(`${baseUrl}&q=${searchWord}`)
      .then((res) => res.json())
      .then(({ items }) => {
        if (items.lan.length === 0) {
          searchCase.value = CASE_MISSING;
        } else if (checkNormalCase(items.lan[0].key)) {
          searchCase.value = CASE_NORMAL;
        } else {
          searchCase.value = CASE_SIMILAR;
        }
        data.value = items.lan;
      })
      .catch((err) => (error.value = err));
  };

  await fetchData(searchWordToValue);

  return { data, searchCase, error };
}

export default useWordSearch;
