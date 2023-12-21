<script setup>
import SearchModalNoraml from './SearchModalNoraml.vue';
import SearchModalMissing from './SearchModalMissing.vue';
import SearchModalSimilar from './SearchModalSimilar.vue';
import SearchModalError from './SearchModalError.vue';
import useSearchWord from '../composables/searchWord';
import MODAL_CASE from '../constant';
import { storeToRefs } from 'pinia';
import { useTargetWordStore } from '../../wordInput/composables/targetWordStore';

const targetWordStore = useTargetWordStore();
const { targetWord } = storeToRefs(targetWordStore);
const { data, searchCase, error } = useSearchWord(targetWord);
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
