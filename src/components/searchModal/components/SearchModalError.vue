<script setup>
import TheModal from '../../TheModal.vue';
import useErrorCase from '../composables/errorCase';
import { useSearchStore } from '../composables/searchStore';
import { onKeyStroke } from '@vueuse/core';
import { useTargetWordStore } from '../../wordInput/composables/targetWordStore';
import { onMounted, onUnmounted } from 'vue';

const searchStore = useSearchStore();
const targetWordStore = useTargetWordStore();
const { errorPhase } = useErrorCase();

onMounted(() => console.log('error open'));
onUnmounted(() => console.log('error close'));

onKeyStroke(['Enter'], () => closeModal());

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
        v-for="phrase in errorPhase"
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
