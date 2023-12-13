<script setup>
import TheModal from '../../TheModal.vue';
import useSimilarCase from '../compositions/similarCase';
import { useSearchStore } from '../compositions/searchStore';
import { onKeyStroke } from '@vueuse/core';

const props = defineProps({
  searchData: Array,
});

const searchStore = useSearchStore();
const searchWord = searchStore.targetWord;
const { similarWords } = useSimilarCase(props.searchData);

onKeyStroke(['Enter'], () => closeModal());

function clickSimilarWord(similarWord) {
  searchStore.searchSimilarWord(similarWord);
}

function closeModal() {
  searchStore.closeSearchModal();
}
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ searchWord }}
    </template>
    <template #means>
      <div
        v-for="similarWord in similarWords"
        :key="similarWord"
        @click="clickSimilarWord(similarWord)"
        class="modal_means hover:text-xl cursor-pointer h-[32px] leading-[32px] hover:leading-[32px]"
      >
        {{ similarWord }}
      </div>
    </template>
    <template #footer>
      <div class="flex">
        <button
          @click="closeModal"
          class="modal_btn px-3.5 bg-blue-500 hover:bg-blue-600"
        >
          ok
        </button>
      </div>
    </template>
  </TheModal>
</template>
