import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { getCurrentTimeInfo } from '../../../utils/timeInfo';
import { toValue } from 'vue';

export const useNoteStore = defineStore('note', () => {
  const localNoteWords = useStorage('noteWords', new Map(), localStorage);

  function checkWordExist(targetWord) {
    if (localNoteWords.value.has(targetWord)) {
      localNoteWords.value.delete(targetWord);
    }
  }

  function addWord({ word, means }) {
    const { timeInfo, timestamp } = getCurrentTimeInfo();
    const wordInfo = {
      word,
      timeInfo,
      timestamp,
      means: toValue(means).toString(),
      check: false,
    };
    console.log(wordInfo);
    checkWordExist(word);

    localNoteWords.value.set(word, wordInfo);
  }

  function deleteWord(targetWord) {
    localNoteWords.value.delete(targetWord);
  }

  function checkWord(targetWord) {
    const wordInfo = localNoteWords.value.get(targetWord);
    wordInfo.check = !wordInfo.check;
  }

  return {
    localNoteWords,
    addWord,
    deleteWord,
    checkWord,
  };
});
