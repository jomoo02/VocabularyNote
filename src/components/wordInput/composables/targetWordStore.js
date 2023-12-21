import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTargetWordStore = defineStore('targetWord', () => {
  const targetWord = ref(null);

  function setTargetWord(word) {
    targetWord.value = word;
  }

  return {
    targetWord,
    setTargetWord,
  };
});
