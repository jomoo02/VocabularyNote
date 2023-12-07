<script setup>
import { useMainStore } from '../stores/Main';
import WordCardV2 from './WordCardV2.vue';
import WordTrashCanV2 from './WordTrashCanV2.vue';

const mainStore = useMainStore();
</script>

<template>
  <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
    <template v-if="mainStore.screenTransition === 0">
      <div class="grid md:grid-cols-2 md:gap-x-36">
        <div
          v-for="(word, index) in mainStore.wordArr"
          :key="word"
          class="mb-[32px]"
        >
          <WordCardV2
            :word="word.word"
            :means="word.means"
            :check="word.check"
            :time="word.time"
            :index="index"
          ></WordCardV2>
        </div>
      </div>
    </template>
    <template v-if="mainStore.screenTransition === 1">
      <div>
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
      </div>
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
