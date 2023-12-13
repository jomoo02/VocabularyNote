import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchModalOpenState = ref(false);
  const targetWord = ref(null);

  function closeSearchModal() {
    searchModalOpenState.value = false;
  }

  function openSearchModal() {
    searchModalOpenState.value = true;
  }

  function setTargetWord(word) {
    targetWord.value = word;
    openSearchModal();
  }

  function searchSimilarWord(similarWord) {
    closeSearchModal();
    setTargetWord(similarWord);
  }

  return {
    targetWord,
    searchModalOpenState,
    closeSearchModal,
    openSearchModal,
    setTargetWord,
    searchSimilarWord,
  };
});
