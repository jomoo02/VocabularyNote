import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchModalOpenState = ref(false);
  const targetWord = ref(null);

  function setTagetWord(word) {
    targetWord.value = word;
    openSearchModal();
  }

  function searchSimilarWord(similarWord) {
    closeSearchModal();
    setTagetWord(similarWord);
  }

  function closeSearchModal() {
    searchModalOpenState.value = false;
  }

  function openSearchModal() {
    searchModalOpenState.value = true;
  }

  return {
    targetWord,
    searchModalOpenState,
    closeSearchModal,
    openSearchModal,
    setTagetWord,
    searchSimilarWord,
  };
});
