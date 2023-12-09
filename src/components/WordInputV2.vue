<script setup>
import { useMainStore } from '../stores/Main';
import { Icon } from '@iconify/vue';
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';

const INPUT_WORD = '단어를 입력해주세요';
const CAN_NOT_INPUT_WORD = '단어를 입력할 수 없습니다';
const RECENT_SEARCH_WORD = '최근 검색한 단어';

const props = defineProps({
  available: Boolean,
});

const mainStore = useMainStore();
const inputWord = ref('');
const recentWordsFocus = ref(false);
const inputRef = ref(null);
const searchBtnRef = ref(null);

const inputTextPlaceholder = computed(() => {
  if (props.available) {
    return INPUT_WORD;
  }
  return CAN_NOT_INPUT_WORD;
});

const testClass = computed(() => {
  if (props.available) {
    return 'bg-white';
  }
  return 'bg-[#cbd5e1]';
});

const outFocusInput = (e) => {
  if (!e.target.closest('#inputContainer')) {
    recentWordsFocus.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', outFocusInput);

  watch(() => props.available, checkAvailable);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', outFocusInput);
});

function checkAvailable(available) {
  let isDisabled = false;

  if (available === false) {
    isDisabled = true;
  }

  toggleWordInputAvailable(isDisabled);
}

function toggleWordInputAvailable(booleanValue) {
  inputRef.value.disabled = booleanValue;
  searchBtnRef.value.disabled = booleanValue;
}

function focusInput() {
  inputRef.value.focus();
}

function clearInputWord() {
  inputWord.value = '';
  focusInput();
}

function clickRecentWordDeleteIcon(wordIndex) {
  mainStore.recentWordDelete(wordIndex);
  focusInput();
}

function alertEmptyWord() {
  window.alert(INPUT_WORD);
  focusInput();
}

function searchInputWord(inputWord) {
  if (inputWord === '') {
    alertEmptyWord();
    return;
  }
}
</script>

<template>
  <div id="inputContainer" @click="(event) => event.stopPropagation()">
    <div
      class="h-9 px-3 border flex items-center border-black"
      :class="testClass"
    >
      <button v-show="inputWord.length > 0" @click="clearInputWord">
        <Icon icon="ph:x-bold" />
      </button>
      <input
        ref="inputRef"
        :placeholder="inputTextPlaceholder"
        :value="inputWord"
        @keyup.enter="searchInputWord(inputWord)"
        @focus="recentWordsFocus = true"
        @input="(event) => (inputWord = event.target.value)"
        class="w-full px-2 focus:outline-0 bg-inherit"
      />
      <button ref="searchBtnRef" @click="searchInputWord(inputWord)">
        <Icon icon="ion:search" width="24" height="24" />
      </button>
    </div>
    <div
      v-show="recentWordsFocus"
      class="absolute w-full bg-white border-[1.5px] border-black"
    >
      <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5">
        {{ RECENT_SEARCH_WORD }}
      </div>
      <div
        v-for="(word, index) in mainStore.localRecentSearchWords"
        :key="index"
        class="flex items-center justify-between px-2"
      >
        <button>
          <span @click="searchInputWord(word)" class="text-sm">
            {{ word }}
          </span>
        </button>
        <button @click="clickRecentWordDeleteIcon(index)" class="flex">
          <Icon icon="ph:x" />
        </button>
      </div>
    </div>
  </div>
</template>
