<script setup>
import { useMainStore } from '../stores/Main';
import WordCardV2 from './WordCardV2.vue';
import WordTrashCanV2 from './WordTrashCanV2.vue';
import TrashCanWordList from './trashCan/components/TrashCanWordList.vue';
import NoteWordList from './note/components/NoteWordList.vue';

const mainStore = useMainStore();
</script>

<template>
  <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
    <template v-if="mainStore.screenTransition === 0">
      <NoteWordList />  
    </template>
    <template v-if="mainStore.screenTransition === 1">
      <TrashCanWordList />
      <!-- <div>
        <div
          v-for="word in mainStore.localTrashCan.values()"
          :key="word"
          class="mb-[32px]"
        >
          <WordTrashCanV2
            :word="word.word"
            :means="word.means"
            :time="word.time"
            :afterTime="word.afterTime"
          ></WordTrashCanV2>
        </div>
      </div> -->
    </template>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatex(-20px);
  opacity: 0;
}
</style>
