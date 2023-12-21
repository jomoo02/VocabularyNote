<script setup>
import TheModal from '../../TheModal.vue';
import { useMissingCase } from '../composables/searchCase';
import { useSearchStore } from '../composables/searchStore';
import { onKeyStroke } from '@vueuse/core';

const props = defineProps({
  word: String,
});

const searchStore = useSearchStore();
const { missingPhrase } = useMissingCase();

function closeModal() {
  searchStore.closeSearchModal();
}

onKeyStroke(['Enter'], () => closeModal());
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ props.word }}
    </template>
    <template #means>
      <li
        v-for="phrase in missingPhrase"
        :key="phrase"
        class="modal_means list-none"
      >
        {{ phrase }}
      </li>
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
