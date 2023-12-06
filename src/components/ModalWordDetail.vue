<script setup>
import { useMainStore } from '../stores/Main';
import { useModalStore } from '../stores/Modal';
import { useDetailWordStore } from '../stores/DetailWord';
import { ref } from 'vue';
import Modal from './TheModal.vue';

const mainStore = useMainStore();
const modalStore = useModalStore();
const detailWordStore = useDetailWordStore();
const detailWord = ref(null);

detailWord.value = { ...detailWordStore.detailWordModalCreate() };
</script>

<template>
  <Modal>
    <template #word>
      {{ detailWord.word }}
    </template>
    <template #means>
      <li v-for="mean in detailWord.means" :key="mean" class="modal_means">
        {{ mean }}
      </li>
    </template>
    <template #footer>
      <div class="flex justify-end modal_timetext">{{ detailWord.time }}</div>
      <div class="flex gap-x-4">
        <button
          @click="modalStore.modalExit"
          class="modal_btn bg-neutral-400 hover:bg-neutral-500"
        >
          cancel
        </button>
        <button
          @click="mainStore.wordDelete(detailWord.word)"
          class="modal_btn bg-rose-400 hover:bg-rose-600"
        >
          delete
        </button>
      </div>
    </template>
  </Modal>
</template>
