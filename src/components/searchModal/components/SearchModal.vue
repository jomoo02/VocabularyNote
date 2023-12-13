<script setup>
import SearchModalNoraml from './SearchModalNoraml.vue';
import SearchModalMissing from './SearchModalMissing.vue';
import SearchModalSimilar from './SearchModalSimilar.vue';
import SearchModalError from './SearchModalError.vue'
import useWordSearch from '../compositions/wordSearch';
import { ref, watch, onMounted } from 'vue';
import { useSearchStore } from '../compositions/searchStore';

const CASE_NORMAL = 'CASE_NORMAL';
const CASE_MISSING = 'CASE_MISSING';
const CASE_SIMILAR = 'CASE_SIMILAR';

const searchStore = useSearchStore();

const modalCase = ref(null);
const searchData = ref(null);
const searchError = ref(null);

onMounted(() => {
  searchWord(searchStore.targetWord);
});

watch(
  () => searchStore.targetWord,
  (newTargetWord) => {
    searchWord(newTargetWord);
  },
);

async function searchWord(targetWord) {
  modalCase.value = null;
  searchData.value = null;

  const { data, searchCase, error } = await useWordSearch(targetWord, {
    CASE_NORMAL,
    CASE_MISSING,
    CASE_SIMILAR,
  });

  searchData.value = data.value;
  modalCase.value = searchCase.value;
  searchError.value = error.value;
}
</script>

<template>
  <div v-if="searchError">
    <SearchModalError />
  </div>
  <div v-else-if="searchData">
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
