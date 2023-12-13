import axios from 'axios';

const config = {
  baseUrl: '/search/language/v1/search.json?cate=lan',
};

function fetchWordList(word) {
  // const data1 = await axios.get(`${config.baseUrl}&q=${word}`);
  const fetchData = fetch(`${config.baseUrl}&q=${word}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return fetchData;
}

export { fetchWordList };
