import { toValue } from 'vue';

function useValidateInputWord(inputWord) {
  const word = toValue(inputWord);

  const checkEmpty = (word) => word === '';
  const checkNotEnglish = (word) => /[^a-zA-Z]/.test(word);

  return checkEmpty(word) || checkNotEnglish(word);
}

export default useValidateInputWord;
