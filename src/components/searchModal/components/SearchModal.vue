<script setup>
import SearchModalNoraml from './SearchModalNoraml.vue';
import SearchModalMissing from './SearchModalMissing.vue';
import SearchModalSimilar from './SearchModalSimilar.vue';
import SearchModalError from './SearchModalError.vue';
import useSearchWord from '../composables/searchWord';
import { ref, watch } from 'vue';
import { useSearchStore } from '../composables/searchStore';
import MODAL_CASE from '../constant';

const searchStore = useSearchStore();
const searchWord = ref(searchStore.targetWord);

watch(
  () => searchStore.targetWord,
  (newTargetWord) => (searchWord.value = newTargetWord),
);

const { data, searchCase, error } = useSearchWord(searchWord);
</script>

<template>
  <div v-if="error">
    <SearchModalError />
  </div>
  <div v-else-if="data">
    <SearchModalNoraml
      v-if="searchCase === MODAL_CASE.normal"
      :searchData="data"
    />
    <SearchModalSimilar
      v-else-if="searchCase === MODAL_CASE.similar"
      :searchData="data"
    />
    <SearchModalMissing v-else />
  </div>
</template>
