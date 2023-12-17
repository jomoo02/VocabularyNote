<script setup>
import TheModal from '../../TheModal.vue';
import useNormalCase from '../composables/normalCase';
import { useNoteStore } from '../../note/composables/noteStore';
import { useSearchStore } from '../composables/searchStore';
import { onMounted } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useRecentSearchStore } from '../../recentSearch/composables/recentSearchStore';

const props = defineProps({
  searchData: Array,
});

const noteStore = useNoteStore();
const searchStore = useSearchStore();
const recentRecentSearchStore = useRecentSearchStore();
const searchWord = searchStore.targetWord;
const { means: searchWordMeans } = useNormalCase(searchWord, props.searchData);

onMounted(() => {
  addRecentSearchWord();
});

onKeyStroke(['Enter'], () => addWord());

function closeModal() {
  searchStore.closeSearchModal();
}

function addWord() {
  noteStore.addWord({ word: searchWord, means: searchWordMeans });
  closeModal();
}

function addRecentSearchWord() {
  recentRecentSearchStore.updateRecentSearchWords(searchWord);
}
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ searchWord }}
    </template>
    <template #means>
      <li v-for="mean in searchWordMeans" :key="mean" class="modal_means">
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
