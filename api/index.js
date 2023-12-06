import axios from 'axios';

const config = {
  baseUrl: '/search/language/v1/search.json?cate=lan',
};

function fetchWordList(word) {
  return axios.get(`${config.baseUrl}&q=${word}`);
}

export { fetchWordList };
