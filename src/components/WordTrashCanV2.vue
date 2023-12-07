<script setup>
import { computed, ref } from 'vue';
import { useMainStore } from '../stores/Main';
import ModalTrashCanWordDetailV2 from './ModalTrashCanWordDetailV2.vue';

const props = defineProps({
  word: String,
  means: String,
  time: String,
  afterTime: String,
});

const means = computed(() => props.means.split(','));

const mainStore = useMainStore();

const openTrashCanWordDetail = ref(false);

function toggleOpenTrashCanWord() {
  openTrashCanWordDetail.value = !openTrashCanWordDetail.value;
}

function restoreWord() {
  toggleOpenTrashCanWord();
  mainStore.trashCanWordRestore(props.word);
}

function killWord() {
  toggleOpenTrashCanWord();
  mainStore.trashCanWordKill(props.word);
}
</script>

<template>
  <div>
    <span class="card_word" @click="toggleOpenTrashCanWord">
      {{ props.word }}
    </span>
    <div class="card_content">삭제한 날짜 : {{ props.time }}</div>
    <div class="card_content">완전히 삭제될 날짜 : {{ props.afterTime }}</div>
    <Teleport to="body">
      <ModalTrashCanWordDetailV2
        v-if="openTrashCanWordDetail"
        :word="props.word"
        :means="means"
        :time="props.time"
        :after-time="props.afterTime"
        @close="toggleOpenTrashCanWord"
        @restore="restoreWord"
        @kill="killWord"
      />
    </Teleport>
  </div>
</template>
