import { ref } from 'vue';

function useMissingCase() {
  const MISSING_PHRASE_1 = '없는 단어입니다';
  const MISSING_PHRASE_2 = '다른 단어를 입력해 주세요';
  const missingPhrase = ref(null);

  missingPhrase.value = [MISSING_PHRASE_1, MISSING_PHRASE_2];
  return { missingPhrase };
}

export default useMissingCase;