<script setup>
import WordInput from './components/WordInput.vue'
import WordList from './components/WordList.vue'
import { onMounted } from 'vue'
import { useStoreStore } from '@/stores/store'
const store = useStoreStore();

store.setWordDic();

</script>

<template>
  <header class="pb-16">
      <WordInput></WordInput>
  </header>

  <main class="pt-[32px] px-10 md:px-24 lg:px-32 2xl:px-80 min-h-screen">
    <WordList></WordList>
  </main>
</template>

<style scoped>
*{
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
