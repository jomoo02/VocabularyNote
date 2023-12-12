import { ref, toValue } from 'vue';

function useNormalCase(targetWord, wordData) {
  const means = ref(null);
  const targetWordToValue = toValue(targetWord);
  const wordDataToValue = toValue(wordData);

  function pickTargetWordMeans() {
    const targetWordsMeans = Object.values(
      wordDataToValue
        .filter(({ key }) => key === targetWordToValue)
        .map((targetWordData) => targetWordData.item),
    );
    return targetWordsMeans.flatMap((targetWordItem) =>
      targetWordItem.split('|').pop().split(', '),
    );
  }

  means.value = pickTargetWordMeans();
  return { means };
}

export default useNormalCase;
