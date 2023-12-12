import { ref, toValue } from 'vue';

function useSimilarCase(wordData) {
  const similarWords = ref(null);

  similarWords.value = toValue(wordData).map((word) => word.key);

  return { similarWords };
}

export default useSimilarCase;
