<script setup>
import WordList from './components/WordList.vue'
import TheHeader from './components/TheHeader.vue';
import { useMainStore } from '@/stores/Main'
import { useModalStore } from './stores/modal';
import { onKeyStroke } from '@vueuse/core'
import { useInputWordStore } from './stores/InputWord';

const mainStore = useMainStore();
const modalStore = useModalStore();
const wordStore = useInputWordStore();

mainStore.setWordDic();

onKeyStroke(['Escape'], (e) => {
    if (modalStore.inputModal || modalStore.detailModal || modalStore.trashCanWordModal || modalStore.inputNotExistModal || modalStore.inputSimilarModal) {
        modalStore.modalExit();
    }
});

onKeyStroke(['Enter'], (e) => {
    if (modalStore.inputModal) {
      const [word, means] = wordStore.caseNomalCreate();
      mainStore.wordAdd(word, means);
    }
    else if (modalStore.inputNotExistModal) {
      modalStore.modalExit();
    }
});

</script>

<template>
  <header class="pb-16">
      <TheHeader></TheHeader>
  </header>

  <main class="pt-[32px] px-10 md:px-24 lg:px-32 2xl:px-80 min-h-screen">
    <WordList></WordList>
  </main>
</template>

<style scoped>
* {
 --bg-color: #F2E399;
 --bg-transparent: rgba(255, 255, 255, 0);
 --border-color: #BFBFBF; 
}

main {
  font-size: 16px;
  line-height: 32px;
  background: linear-gradient(
    to bottom,
    var(--border-color) 0%,
    var(--border-color) 1px,
    var(--bg-transparent) 1px,
    var(--bg-transparent) 100%
  );
  background-size: 100% 32px;
  background-color: var(--bg-color);
  overflow-y: auto;
}

@media (max-width: 281px) {
  * {
    font-size: 14px;
  }
}
</style>
