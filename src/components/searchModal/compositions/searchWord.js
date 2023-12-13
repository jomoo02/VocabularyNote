import { ref, toValue, watchEffect } from 'vue';
import MODAL_CASE from '../constant';

const baseUrl = '/search/language/v1/search.json?cate=lan';

function useSearchWord(searchWord) {
  const data = ref(null);
  const searchCase = ref(null);
  const error = ref(null);

  const checkNormalCase = (words) => {
    return words.toLowerCase() === toValue(searchWord).toLowerCase();
  };

  const filterItems = (items) => {
    return items.lan.filter((item) => /[a-zA-Z]/.test(item.key));
  };

  const decideSearchCase = (items) => {
    const { normal, similar, missing } = MODAL_CASE;
    if (items.length === 0) {
      return missing;
    }
    if (checkNormalCase(items[0].key)) {
      return normal;
    }
    return similar;
  };

  async function fetchData() {
    data.value = null;
    searchCase.value = null;
    error.value = null;

    await fetch(`${baseUrl}&q=${toValue(searchWord)}`)
      .then((res) => res.json())
      .then(({ items }) => {
        const filterdItems = filterItems(items);
        searchCase.value = decideSearchCase(filterdItems);
        data.value = filterdItems;
      })
      .catch((err) => {
        error.value = err;
        console.log(err);
      });
  }

  watchEffect(() => {
    fetchData();
  });

  return { data, searchCase, error };
}

export default useSearchWord;
