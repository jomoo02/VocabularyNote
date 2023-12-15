<script setup>
import { useNoteStore } from '../compositions/noteStore';
import NoteWordCard from './NoteWordCard.vue';
import { computed } from 'vue';

const noteStore = useNoteStore();

const wordList = computed(() => {
  return [...noteStore.localNoteWords.values()].sort(
    (a, b) => b.timestamp - a.timestamp,
  );
});
</script>

<template>
  <NoteWordCard
    v-for="wordObj in wordList"
    class="mb-[32px]"
    :key="wordObj.word"
    :word="wordObj.word"
    :means="wordObj.means"
    :check="wordObj.check"
    :time-info="wordObj.timeInfo"
  />
</template>
