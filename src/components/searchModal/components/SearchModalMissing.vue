<script setup>
import TheModal from '../../TheModal.vue';
import useMissingCase from '../compositions/missingCase';
import { useSearchStore } from '../compositions/searchStore';

const searchStore = useSearchStore();
const { missing } = useMissingCase();

function closeModal() {
  searchStore.closeSearchModal();
}
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ searchStore.targetWord }}
    </template>
    <template #means>
      <li
        v-for="missingPhrase in missing"
        :key="missingPhrase"
        class="modal_means"
      >
        {{ missingPhrase }}
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
