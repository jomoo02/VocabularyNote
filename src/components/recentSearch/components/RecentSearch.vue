<script setup>
import { useRecentSearchStore } from '../compositions/recentSearchStore';
import { Icon } from '@iconify/vue';

const RECENT_SEARCH_WORD = '최근 검색한 단어';

const recentSearchStore = useRecentSearchStore();

const emits = defineEmits(['clickRecentWord']);

function clickDeleteButton(tagetWordIndex) {
  recentSearchStore.deleteRecentSearchWord(tagetWordIndex);
}

function clickRecentWord(targetWord) {
  emits('clickRecentWord', targetWord);
}
</script>

<template>
  <div class="absolute w-full bg-white border-[1.5px] border-black">
    <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5">
      {{ RECENT_SEARCH_WORD }}
    </div>
    <div
      v-for="(word, index) in recentSearchStore.localRecentSearchWords"
      :key="index"
      class="flex items-center justify-between px-2"
    >
      <button>
        <span @click="clickRecentWord(word)" class="text-sm">
          {{ word }}
        </span>
      </button>
      <button @click="clickDeleteButton(index)" class="flex">
        <Icon icon="ph:x" />
      </button>
    </div>
  </div>
</template>
