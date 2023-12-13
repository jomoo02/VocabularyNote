import { ref, toValue } from 'vue';

function useSimilarCase(wordData) {
  const similarWords = ref(null);
  similarWords.value = toValue(wordData)
    .map((word) => word.key)
    .slice(0, 6);
  return { similarWords };
}

export default useSimilarCase;
