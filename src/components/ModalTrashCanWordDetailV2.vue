<script setup>
import TheModal from './TheModal.vue';

const props = defineProps({
  word: String,
  means: Array,
  time: String,
  afterTime: String,
});

const emits = defineEmits(['close', 'restore', 'kill']);

function restoreWord() {
  emits('restore');
}

function killWord() {
  emits('kill');
}

function closeDetail() {
  emits('close');
}
</script>

<template>
  <TheModal @clickCloseIcon="closeDetail">
    <template #word>
      {{ props.word }}
    </template>
    <template #means>
      <li v-for="mean in props.means" :key="mean" class="modal_means">
        {{ mean }}
      </li>
    </template>
    <template #footer>
      <div class="modal_timetext">
        <div>삭제한 날짜: {{ props.time }}</div>
        <div>삭제될 날짜: {{ props.afterTime }}</div>
      </div>
      <div class="flex gap-x-4 justify-end">
        <button
          @click="restoreWord"
          class="modal_btn bg-emerald-400 hover:bg-emerald-500"
        >
          restore
        </button>
        <button
          @click="killWord"
          class="modal_btn bg-rose-400 hover:bg-rose-600"
        >
          delete
        </button>
      </div>
    </template>
  </TheModal>
</template>
