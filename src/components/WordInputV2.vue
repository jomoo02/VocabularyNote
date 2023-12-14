<script setup>
import { Icon } from '@iconify/vue';
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import SearchModal from '../components/searchModal/components/SearchModal.vue';
import { useSearchStore } from './searchModal/compositions/searchStore';
import RecentSearch from './recentSearch/components/RecentSearch.vue';

const INPUT_WORD = '단어를 입력해주세요';
const CAN_NOT_INPUT_WORD = '단어를 입력할 수 없습니다';

const props = defineProps({
  available: Boolean,
});

const searchStore = useSearchStore();
const inputWord = ref('');
const recentWordsFocus = ref(false);
const inputRef = ref(null);
const searchBtnRef = ref(null);

const inputTextPlaceholder = computed(() => {
  const placeholder = props.available ? INPUT_WORD : CAN_NOT_INPUT_WORD;
  return placeholder;
});

const wordInputBackGroundColor = computed(() => {
  const backGroundColor = props.available ? 'bg-white' : 'bg-[#cbd5e1]';
  return backGroundColor;
});

const outFocusInput = (e) => {
  if (!e.target.closest('#inputContainer')) {
    recentWordsFocus.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', outFocusInput);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', outFocusInput);
});

watch(
  () => props.available,
  (newValue) => toggleWordInputAvailable(!newValue),
);
watch(
  () => searchStore.searchModalOpenState,
  (newState) => toggleWordInputAvailable(newState),
);

function toggleWordInputAvailable(booleanValue) {
  inputRef.value.disabled = booleanValue;
  searchBtnRef.value.disabled = booleanValue;
  focusInput();
}

function focusInput() {
  inputRef.value.focus();
}

function clearInputWord() {
  inputWord.value = '';
  focusInput();
}

function alertInputCondition() {
  window.alert('영어 단어를 입력해 주세요.');
  inputWord.value = '';
  focusInput();
}

function checkEmptyWord(searchWord) {
  return searchWord === '';
}

function checkNotEnglishWord(searchWord) {
  const isNotEnglish = /[^a-zA-Z]/.test(searchWord);
  return isNotEnglish;
}

function searchTargetWord(targetWord) {
  searchStore.setTargetWord(targetWord);
  inputWord.value = '';
  recentWordsFocus.value = false;
}

function searchInputWord() {
  const searchWord = inputWord.value;

  if (checkEmptyWord(searchWord) || checkNotEnglishWord(searchWord)) {
    alertInputCondition();
    return;
  }

  searchTargetWord(searchWord);
}
</script>

<template>
  <div id="inputContainer">
    <div
      class="h-9 px-3 border flex items-center border-black"
      :class="wordInputBackGroundColor"
    >
      <button v-show="inputWord.length > 0" @click="clearInputWord">
        <Icon icon="ph:x-bold" />
      </button>
      <input
        ref="inputRef"
        :placeholder="inputTextPlaceholder"
        :value="inputWord"
        @keydown.enter="searchInputWord"
        @focus="recentWordsFocus = true"
        @input="(event) => (inputWord = event.target.value)"
        class="w-full px-2 focus:outline-0 bg-inherit"
      />
      <button ref="searchBtnRef" @click="searchInputWord">
        <Icon icon="ion:search" width="24" height="24" />
      </button>
    </div>
    <RecentSearch
      v-show="recentWordsFocus"
      @click-recent-word="(recentWord) => searchTargetWord(recentWord)"
    />
    <Teleport to="body">
      <SearchModal v-if="searchStore.searchModalOpenState" />
    </Teleport>
  </div>
</template>
