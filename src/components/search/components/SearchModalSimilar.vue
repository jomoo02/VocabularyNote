<script setup>
import TheModal from '../../TheModal.vue';
import { useSimilarCase } from '../composables/searchCase';
import { useSearchStore } from '../composables/searchStore';
import { useTargetWordStore } from '../../wordInput/composables/targetWordStore';
import { onKeyStroke } from '@vueuse/core';

const props = defineProps({
  word: String,
  searchData: Array,
});

const searchStore = useSearchStore();
const targetWordStore = useTargetWordStore();

const { similarWords } = useSimilarCase(props.searchData);

function clickSimilarWord(similarWord) {
  targetWordStore.setTargetWord(similarWord);
}

function closeModal() {
  searchStore.closeSearchModal();
}

onKeyStroke(['Enter'], () => closeModal());
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word> {{ props.word }}와 유사한 단어 </template>
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
