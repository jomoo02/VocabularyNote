<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import NoteWordDetailModal from './NoteWordDetailModal.vue';
import { useNoteStore } from '../composables/noteStore';
import { useTrashCanStore } from '../../trashcan/composables/trashCanStore';

const props = defineProps({
  word: String,
  means: String,
  check: Boolean,
  timeInfo: String,
});

const noteStore = useNoteStore();
const trashCanStore = useTrashCanStore();
const means = computed(() => props.means.split(','));
const openWordDetail = ref(false);

const iconType = computed(() =>
  props.check ? 'carbon:checkbox-checked' : 'carbon:checkbox',
);

const checkWordStyle = computed(() =>
  props.check ? 'opacity-60 line-through decoration-2' : '',
);

function toggleDetailOpen() {
  openWordDetail.value = !openWordDetail.value;
}

function deleteWord() {
  toggleDetailOpen();
  noteStore.deleteWord(props.word);
  trashCanStore.addTrashCanWord({ word: props.word, means });
}

function checkBtnClick() {
  noteStore.checkWord(props.word);
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-x-1">
      <button>
        <Icon
          class="flex items-center"
          @click="checkBtnClick"
          :icon="iconType"
          width="37"
          height="37"
        />
      </button>
      <span
        class="card_word"
        :class="checkWordStyle"
        @click="toggleDetailOpen"
        >{{ props.word }}</span
      >
    </div>
    <div :class="checkWordStyle">
      <li v-for="mean in means" :key="mean" class="card_content">
        {{ mean }}
      </li>
    </div>
    <Teleport to="body">
      <NoteWordDetailModal
        v-if="openWordDetail"
        :word="props.word"
        :means="means"
        :time-info="props.timeInfo"
        @close="toggleDetailOpen"
        @delete="deleteWord"
      />
    </Teleport>
  </div>
</template>
