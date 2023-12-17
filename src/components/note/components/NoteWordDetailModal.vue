<script setup>
import TheModal from '../../TheModal.vue';

const props = defineProps({
  word: String,
  means: Array,
  timeInfo: String,
});

const emits = defineEmits(['close', 'delete']);

function closeDetailWord() {
  emits('close');
}

function deleteWord() {
  emits('delete');
}
</script>

<template>
  <TheModal @clickCloseIcon="closeDetailWord">
    <template #word>
      {{ props.word }}
    </template>
    <template #means>
      <li v-for="mean in props.means" :key="mean" class="modal_means">
        {{ mean }}
      </li>
    </template>
    <template #footer>
      <div class="flex justify-end modal_timetext">{{ props.timeInfo }}</div>
      <div class="flex gap-x-4">
        <button
          @click="closeDetailWord"
          class="modal_btn bg-neutral-400 hover:bg-neutral-500"
        >
          cancel
        </button>
        <button
          @click="deleteWord"
          class="modal_btn bg-rose-400 hover:bg-rose-600"
        >
          delete
        </button>
      </div>
    </template>
  </TheModal>
</template>
