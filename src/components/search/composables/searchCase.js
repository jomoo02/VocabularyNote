import { ref, toValue } from 'vue';

const SLICE_START_INDEX = 0;
const SLICE_END_INDEX = 6;

export function useNormalCase(targetWord, wordData) {
  const means = ref(null);
  const targetWordToValue = toValue(targetWord);
  const wordDataToValue = toValue(wordData);

  function pickTargetWordMeans() {
    const targetWordsMeans = Object.values(
      wordDataToValue
        .filter(({ key }) => key === targetWordToValue)
        .map((targetWordData) => targetWordData.item),
    );
    return targetWordsMeans
      .flatMap((targetWordItem) => targetWordItem.split('|').pop().split(', '))
      .slice(SLICE_START_INDEX, SLICE_END_INDEX);
  }

  means.value = pickTargetWordMeans();
  return { means };
}

export function useSimilarCase(wordData) {
  const similarWords = ref(null);

  similarWords.value = toValue(wordData)
    .map((word) => word.key)
    .slice(SLICE_START_INDEX, SLICE_END_INDEX);
  return { similarWords };
}

export function useMissingCase() {
  const MISSING_PHRASE_1 = '없는 단어입니다';
  const MISSING_PHRASE_2 = '다른 단어를 입력해 주세요';
  const missingPhrase = ref(null);

  missingPhrase.value = [MISSING_PHRASE_1, MISSING_PHRASE_2];
  return { missingPhrase };
}

export function useErrorCase() {
  const ERROR_PHASE_1 = '에러가 발생했습니다.';
  const ERROR_PHASE_2 = '잠시 후 단어를 입력해 주세요';
  const errorPhase = ref(null);

  errorPhase.value = [ERROR_PHASE_1, ERROR_PHASE_2];
  return { errorPhase };
}
