<script setup>
import SearchModalNoraml from './SearchModalNoraml.vue';
import SearchModalMissing from './SearchModalMissing.vue';
import SearchModalSimilar from './SearchModalSimilar.vue';
import useWordSearch from '../compositions/wordSearch';
import { ref, watch } from 'vue';
import { useSearchStore } from '../compositions/searchStore';

const searchStore = useSearchStore();
const CASE_NORMAL = 'CASE_NORMAL';
const CASE_MISSING = 'CASE_MISSING';
const CASE_SIMILAR = 'CASE_SIMILAR';
const modalCase = ref(null);
const searchData = ref(null);

watch(
  () => searchStore.targetWord,
  (newTargetWord) => {
    searchWord(newTargetWord);
  },
);

async function searchWord(targetWord) {
  modalCase.value = null;
  searchData.value = null;

  const { data, searchCase } = await useWordSearch(targetWord, {
    CASE_NORMAL,
    CASE_MISSING,
    CASE_SIMILAR,
  });

  searchData.value = data.value;
  modalCase.value = searchCase.value;
}

searchWord(searchStore.targetWord);
</script>

<template>
  <div>
    <SearchModalNoraml
      v-if="modalCase === CASE_NORMAL"
      :searchData="searchData"
    />
    <SearchModalMissing v-if="modalCase === CASE_MISSING" />
    <SearchModalSimilar
      v-if="modalCase === CASE_SIMILAR"
      :searchData="searchData"
    />
  </div>
</template>
