import { toValue } from 'vue';

function checkEmpty(word) {
  return word === '';
}

function checkNotEnglish(word) {
  const isNotEnglish = /[^a-zA-Z]/.test(word);
  return isNotEnglish;
}

function useValidateInputWord(inputWord) {
  const word = toValue(inputWord);

  return checkEmpty(word) || checkNotEnglish(word);
}

export default useValidateInputWord;
