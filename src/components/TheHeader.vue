<script setup>
import { Icon } from '@iconify/vue';
import { inject, computed } from 'vue';
import WordInput from '../components/wordInput/components/WordInput.vue';

const { isNoteMode, changeMode } = inject('mode');

const iconType = computed(() => (isNoteMode.value ? 'ph:trash' : 'ph:notepad'));
</script>

<template>
  <div
    class="fixed top-0 z-20 flex items-center w-full h-16 min-h-16 max-h-16 justify-between py-2 px-2 xs:px-6 sm:px-10 md:px-24 lg:px-48 2xl:px-80 bg-[#2E4559]"
  >
    <div class="text-2xl md:text-4xl font-bold text-white">voca</div>
    <div class="relative w-3/5 md:w-1/2">
      <WordInput />
    </div>
    <button @click="changeMode">
      <Icon :icon="iconType" width="34" height="34" color="#e4e4e7" />
    </button>
  </div>
</template>
