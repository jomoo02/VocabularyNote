<script setup>
import WordInput from './components/WordInput.vue';
import WordList from './components/WordList.vue';
import { onMounted, onBeforeMount } from 'vue';
import { useStoreStore } from '@/stores/store';
const store = useStoreStore();

onMounted(() => {
  store.setWordDic();
  
})

</script>

<template>
  <header class="pb-16">
      <WordInput></WordInput>
  </header>

  <main class="pt-[32px] px-10 md:px-24 lg:px-32 2xl:px-80  min-h-screen ">
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
  /* border: 2px solid var(--border-color); */
  /* background: -webkit-linear-gradient(
    top,
    var(--border-color) 0%,
    var(--border-color) 1px,
    var(--bg-transparent) 1px,
    var(--bg-transparent) 100%
  ); */
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
/* main{

  min-height: 100vh;
  background: -webkit-linear-gradient(top,
      var(--border-color) 0%,
      var(--border-color) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem),
      var(--bg-transparent) 100%);
  background: linear-gradient(to bottom,
      var(--border-color) 0%,
      var(--border-color) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem),
      var(--bg-transparent) var(--px-to-rem));
  background-size: 100% 2.3rem;
  background-color: #F2E399;
  height:100%;
  width: 100%;
  margin: 0;
  font-size: 15px;
} */
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
