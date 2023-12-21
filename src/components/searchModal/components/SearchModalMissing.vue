<script setup>
import TheModal from '../../TheModal.vue';
import useMissingCase from '../composables/missingCase';
import { useSearchStore } from '../composables/searchStore';
import { useTargetWordStore } from '../../wordInput/composables/targetWordStore';
import { onKeyStroke } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';

const searchStore = useSearchStore();
const targetWordStore = useTargetWordStore();
const { missingPhrase } = useMissingCase();

onKeyStroke(['Enter'], () => closeModal());

onMounted(() => console.log('missing open'));
onUnmounted(() => console.log('missing close'));

function closeModal() {
  searchStore.closeSearchModal();
}
</script>

<template>
  <TheModal @click-close-icon="closeModal">
    <template #word>
      {{ targetWordStore.targetWord }}
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
