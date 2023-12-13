<script setup>
import TheModal from '../../TheModal.vue';
import useNormalCase from '../compositions/normalCase';
import { useMainStore } from '../../../stores/Main';
import { useSearchStore } from '../compositions/searchStore';
import { onMounted } from 'vue';
import { onKeyStroke } from '@vueuse/core';

const props = defineProps({
  searchData: Array,
});

const mainStore = useMainStore();
const searchStore = useSearchStore();
const searchWord = searchStore.targetWord;
const { means: searchWordMeas } = useNormalCase(searchWord, props.searchData);

onMounted(() => {
  addRecentSearchWord();
});

onKeyStroke(['Enter'], () => addWord());

function closeModal() {
  searchStore.closeSearchModal();
}

function addWord() {
  mainStore.wordAdd(searchWord, searchWordMeas.value);
  closeModal();
}

function addRecentSearchWord() {
  mainStore.recentWordUpdate(searchWord);
}
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ searchWord }}
    </template>
    <template #means>
      <li v-for="mean in searchWordMeas" :key="mean" class="modal_means">
        {{ mean }}
      </li>
    </template>
    <template #footer>
      <div class="flex gap-x-4 justify-end">
        <button
          @click="closeModal"
          class="modal_btn bg-neutral-400 hover:bg-neutral-500"
        >
          cancel
        </button>
        <button
          @click="addWord"
          class="modal_btn bg-emerald-400 hover:bg-emerald-600"
        >
          add
        </button>
      </div>
    </template>
  </TheModal>
</template>
