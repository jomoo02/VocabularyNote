<script setup>
import TheHeader from './components/TheHeader.vue';
import NoteWordList from './components/note/components/NoteWordList.vue';
import TrashCanWordList from './components/trashCan/components/TrashCanWordList.vue';
import { ref, provide } from 'vue';
import { useTrashCanStore } from './components/trashCan/compositions/trashCanStore';

const trashCanStore = useTrashCanStore();
const isNoteMode = ref(true);

trashCanStore.deleteExpiredWords();

function changeMode() {
  isNoteMode.value = !isNoteMode.value;
}

provide('mode', {
  isNoteMode,
  changeMode,
});
</script>

<template>
  <header class="pb-16">
    <TheHeader />
  </header>
  <main class="pt-[32px] px-10 md:px-24 lg:px-32 2xl:px-80 min-h-screen">
    <NoteWordList v-if="isNoteMode" />
    <TrashCanWordList v-else />
  </main>
</template>

<style scoped>
* {
  --bg-color: #f2e399;
  --bg-transparent: rgba(255, 255, 255, 0);
  --border-color: #bfbfbf;
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
