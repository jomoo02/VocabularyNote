import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import {
  getCurrentTimeInfo,
  getDeletionScheduledTimeInfo,
} from '../../../utils/timeInfo';
import { toValue } from 'vue';

export const useTrashCanStore = defineStore('trashCan', () => {
  const localTraschCanWords = useStorage(
    'trashCanWords',
    new Map(),
    localStorage,
  );

  function getTrashCanWordDetail(targetWord) {
    const { word, means, deletionSheduledTimeInfo, timeInfo } =
      localTraschCanWords.value.get(targetWord);

    const trashCanWordDetail = {
      word,
      timeInfo,
      deletionSheduledTimeInfo,
      means: means.split(','),
    };

    return trashCanWordDetail;
  }

  function killTrashCanWord(targetWord) {
    localTraschCanWords.value.delete(targetWord);
  }

  function restoreTrashCanWord(targetWord) {
    const { word, means } = localTraschCanWords.value.get(targetWord);
    killTrashCanWord(targetWord);
    return { word, means };
  }

  function checkWordExist(targetWord) {
    if (localTraschCanWords.value.has(targetWord)) {
      localTraschCanWords.value.delete(targetWord);
    }
  }

  function addTrashCanWord({ word, means }) {
    const { timeInfo, deletionSheduledTimeInfo, deletionSheduledTimeStamp } =
      getDeletionScheduledTimeInfo();

    const deleteWordInfo = {
      timeInfo,
      deletionSheduledTimeInfo,
      deletionSheduledTimeStamp,
      word: toValue(word),
      means: toValue(means).toString(),
    };

    checkWordExist(word);

    localTraschCanWords.value.set(word, deleteWordInfo);
  }

  function deleteExpiredWords() {
    const { timestamp } = getCurrentTimeInfo();

    localTraschCanWords.value.forEach(({ deletionSheduledTimeStamp }, word) => {
      if (deletionSheduledTimeStamp <= timestamp) {
        localTraschCanWords.value.delete(word);
      }
    });
  }

  return {
    localTraschCanWords,
    getTrashCanWordDetail,
    killTrashCanWord,
    restoreTrashCanWord,
    addTrashCanWord,
    deleteExpiredWords,
  };
});
