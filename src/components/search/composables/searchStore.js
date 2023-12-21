import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchModalOpenState = ref(false);

  function closeSearchModal() {
    searchModalOpenState.value = false;
  }

  function openSearchModal() {
    searchModalOpenState.value = true;
  }

  return {
    searchModalOpenState,
    closeSearchModal,
    openSearchModal,
  };
});
