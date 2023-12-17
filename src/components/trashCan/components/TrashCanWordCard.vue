<script setup>
import { computed, ref } from 'vue';
import { useTrashCanStore } from '../composables/trashCanStore';
import { useNoteStore } from '../../note/composables/noteStore';
import TrashCanWordDetailModal from './TrashCanWordDetailModal.vue';

const props = defineProps({
  word: String,
  means: String,
  timeInfo: String,
  deletionSheduledTimeInfo: String,
});

const trashCanStore = useTrashCanStore();
const noteStore = useNoteStore();
const means = computed(() => props.means.split(','));
const openTrashCanWordDetail = ref(false);

function toggleOpenTrashCanWord() {
  openTrashCanWordDetail.value = !openTrashCanWordDetail.value;
}

function restoreWord() {
  toggleOpenTrashCanWord();
  noteStore.addWord({ word: props.word, means });
  trashCanStore.killTrashCanWord(props.word);
}

function killWord() {
  toggleOpenTrashCanWord();
  trashCanStore.killTrashCanWord(props.word);
}
</script>

<template>
  <div>
    <span class="card_word" @click="toggleOpenTrashCanWord">
      {{ props.word }}
    </span>
    <div class="card_content">삭제한 날짜 : {{ props.timeInfo }}</div>
    <div class="card_content">
      완전히 삭제될 날짜 : {{ props.deletionSheduledTimeInfo }}
    </div>
    <Teleport to="body">
      <TrashCanWordDetailModal
        v-if="openTrashCanWordDetail"
        :word="props.word"
        :means="means"
        :time-info="props.timeInfo"
        :deletion-sheduled-time-info="props.deletionSheduledTimeInfo"
        @close="toggleOpenTrashCanWord"
        @restore="restoreWord"
        @kill="killWord"
      />
    </Teleport>
  </div>
</template>
