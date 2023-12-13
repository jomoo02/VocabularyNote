<script setup>
import { Icon } from '@iconify/vue';
import { useMainStore } from '../stores/Main';
import { ref, computed } from 'vue';
import ModalWordDetailV2 from './ModalWordDetailV2.vue';

const props = defineProps({
  word: String,
  means: String,
  check: Boolean,
  time: String,
  index: Number,
});

const mainStore = useMainStore();
const means = computed(() => props.means.split(','));
const openWordDetail = ref(false);

function toggleDetailOpen() {
  openWordDetail.value = !openWordDetail.value;
}

function deleteWord() {
  toggleDetailOpen();
  mainStore.wordDelete(props.word);
}

function checkBtnClick() {
  mainStore.wordCheck(props.word, !props.check, props.index);
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-x-1">
      <button>
        <Icon
          v-if="props.check === false"
          class="flex items-center"
          @click="checkBtnClick"
          icon="carbon:checkbox"
          width="37"
          height="37"
        ></Icon>
        <Icon
          v-else
          class="flex items-center"
          @click="checkBtnClick"
          icon="carbon:checkbox-checked"
          width="37"
          height="37"
        ></Icon>
      </button>
      <span
        class="card_word"
        :class="{ wordcheck_active: props.check }"
        @click="toggleDetailOpen"
        >{{ props.word }}</span
      >
    </div>
    <div :class="{ wordcheck_active: props.check }">
      <li v-for="mean in means" :key="mean" class="card_content">
        {{ mean }}
      </li>
    </div>
    <Teleport to="body">
      <ModalWordDetailV2
        v-if="openWordDetail"
        :word="props.word"
        :means="means"
        :time="props.time"
        @close="toggleDetailOpen"
        @delete="deleteWord"
      />
    </Teleport>
  </div>
</template>

<style scoped>
.wordcheck_active {
  @apply opacity-60 line-through decoration-2;
}
</style>
