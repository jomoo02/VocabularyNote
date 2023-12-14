import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useRecentSearchStore = defineStore('recentSearch', () => {
  const localRecentSearchWords = useStorage('recentWords', [], localStorage);

  function removeDuplication(removeIndex) {
    let removedDuplicationWords;

    if (removeIndex !== -1) {
      removedDuplicationWords = [
        ...localRecentSearchWords.value.slice(0, removeIndex),
        ...localRecentSearchWords.value.slice(removeIndex + 1),
      ];
    } else {
      removedDuplicationWords = [...localRecentSearchWords.value];
    }

    if (removedDuplicationWords.length >= 5) {
      removedDuplicationWords.pop();
    }

    return [...removedDuplicationWords];
  }

  function updateRecentSearchWords(targetWord) {
    const duplicatedWordIndex = localRecentSearchWords.value.findIndex(
      (word) => word === targetWord,
    );

    const removedDuplicationWords = removeDuplication(duplicatedWordIndex);
    localRecentSearchWords.value = [targetWord, ...removedDuplicationWords];
  }

  function deleteRecentSearchWord(targetWordIndex) {
    const removedLocalRecentWords = [
      ...localRecentSearchWords.value.slice(0, targetWordIndex),
      ...localRecentSearchWords.value.slice(targetWordIndex + 1),
    ];
    localRecentSearchWords.value = [...removedLocalRecentWords];
  }

  return {
    localRecentSearchWords,
    updateRecentSearchWords,
    deleteRecentSearchWord,
  };
});
