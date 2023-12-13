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

  const filterItems = (items) => {
    return items.lan.filter((item) => /[a-zA-Z]/.test(item.key));
  };

  const decideSearchCase = (items) => {
    if (items.length === 0) {
      return CASE_MISSING;
    }
    if (checkNormalCase(items[0].key)) {
      return CASE_NORMAL;
    }
    return CASE_SIMILAR;
  };

  const fetchData = async () => {
    data.value = null;
    searchCase.value = null;
    error.value = null;

    await fetch(`${baseUrl}&q=${searchWordToValue}`)
      .then((res) => res.json())
      .then(({ items }) => {
        const filterdItems = filterItems(items);
        searchCase.value = decideSearchCase(filterdItems);
        data.value = filterdItems;
      })
      .catch((err) => (error.value = err));
  };

  await fetchData();

  return { data, searchCase, error };
}

export default useWordSearch;
