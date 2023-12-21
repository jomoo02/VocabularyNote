<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, inject } from 'vue';
import useInputClasses from '../composables/inputClasses';
import useFocusInput from '../composables/focusInput';
import useToggleTagsDisabled from '../composables/toggleTagDisabled';
import RecentSearch from '../../recentSearch/components/RecentSearch.vue';
import { useSearchStore } from '../../search/composables/searchStore';
import useValidateInputWord from '../composables/validateInputWord';
import { storeToRefs } from 'pinia';
import { useTargetWordStore } from '../composables/targetWordStore';
import SearchContainer from '../../search/components/SearchContainer.vue';

const CONTAINER_ID = 'inputContainer';

const inputRef = ref(null);
const searchBtnRef = ref(null);

const { isNoteMode } = inject('mode');

const searchModalStore = useSearchStore();
const targetWordStore = useTargetWordStore();

const { searchModalOpenState } = storeToRefs(searchModalStore);
const inputWord = ref('');
const recentWordsFocus = ref(false);
const isInputDisabled = computed(
  () => !isNoteMode.value || searchModalOpenState.value,
);

const { bgColor, placeHolderText } = useInputClasses(isNoteMode);
useFocusInput(recentWordsFocus, `#${CONTAINER_ID}`);
useToggleTagsDisabled([inputRef, searchBtnRef], isInputDisabled);

function focusInput() {
  inputRef.value.focus();
}

function clearInputWord() {
  inputWord.value = '';
  focusInput();
}

function alertInputCondition(e) {
  if (!e.isComposing) {
    window.alert('영어 단어를 입력해 주세요.');
    inputWord.value = '';
    focusInput();
  }
}

function setTargetWord(targetWord) {
  targetWordStore.setTargetWord(targetWord);
  inputWord.value = '';
  recentWordsFocus.value = false;
  searchModalStore.openSearchModal();
}

function handleInputValidationAndSetTargetWord(e) {
  if (useValidateInputWord(inputWord)) {
    alertInputCondition(e);
    return;
  }

  setTargetWord(inputWord.value);
}
</script>

<template>
  <div :id="CONTAINER_ID">
    <div class="flex items-center h-9 px-3 border boder-black" :class="bgColor">
      <button v-show="inputWord" @click="clearInputWord">
        <Icon icon="ph:x-bold" />
      </button>
      <input
        ref="inputRef"
        class="w-full px-2 focus:outline-0 bg-inherit"
        :placeholder="placeHolderText"
        :value="inputWord"
        @keydown.enter="handleInputValidationAndSetTargetWord"
        @keydown.esc="clearInputWord"
        @focus="recentWordsFocus = true"
        @input="(e) => (inputWord = e.target.value)"
      />
      <button ref="searchBtnRef" @click="handleInputValidationAndSetTargetWord">
        <Icon icon="ion:search" width="24" height="24" />
      </button>
    </div>
    <RecentSearch
      v-show="recentWordsFocus"
      @click-recent-word="(recentSearcWord) => setTargetWord(recentSearcWord)"
    />
  </div>
  <Teleport to="body">
    <SearchContainer v-if="searchModalOpenState" />
  </Teleport>
</template>
