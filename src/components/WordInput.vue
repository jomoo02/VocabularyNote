<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import { useMainStore } from '@/stores/Main';

import { useInputWordStore } from '../stores/InputWord';

const mainStore = useMainStore();
const inputWordStore = useInputWordStore();

const wordSearch_input = ref(null);
const search_btn = ref(null);
const inputWord = ref('');
const recentWordFocus = ref(false);

const outFocusInput = (e) => {
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && !e.target.classList.contains('inputTag')) {
        recentWordFocus.value = false;
    }
};

onMounted(() => {
    console.log("onMounted:")
    window.addEventListener('click', outFocusInput);
});

onBeforeUnmount(() => {
    console.log("onBeforeUnmount:")
    window.removeEventListener('click', outFocusInput);
});

function toggleInputAndBtn() {
    wordSearch_input.value.disabled = !wordSearch_input.value.disabled;
    search_btn.value.disabled = !search_btn.value.disabled;
}

function inputTagFoucs() {
    wordSearch_input.value.focus();
}

function childComponent() {
    if (mainStore.screenTransition === 1) {
        recentWordFocus.value = false;
        toggleInputAndBtn();
    }
    else {
        toggleInputAndBtn();
    }
}

function inputWordClear() {
    inputWord.value = '';
    inputTagFoucs();
}

function recentWordDeleteClick(index) {
    mainStore.recentWordDelete(index);
    inputTagFoucs();
}

function caseEmptyWord() {
    window.alert("단어를 입력해 주세요.");
    inputTagFoucs();
}

function wordSearch(searchWord) {
    if (searchWord === '') {
        caseEmptyWord();
        return;
    }
    toggleInputAndBtn();
    inputWordStore.wordSearch(searchWord);

    toggleInputAndBtn();
    inputWord.value = '';
    recentWordFocus.value = false;
}

defineExpose({
    childComponent,
})

</script>

<template>
    <div>
        <div class="h-9 px-3 border flex items-center bg-white border-black inputTag" ref="input_container">
            <button v-show="inputWord.length>0" @click="inputWordClear"><Icon icon="ph:x-bold"></Icon></button>
            <input ref=wordSearch_input placeholder="단어를 입력해주세요" :value="inputWord" @keyup.enter="wordSearch(inputWord)" @focus="recentWordFocus = true"
            @input="event => inputWord = event.target.value" class="w-full px-2 focus:outline-0 inputTag"/>
            <button ref="search_btn" class="inputTag" @click="wordSearch(inputWord)"><Icon icon="ion:search" width="24" height="24"/></button>
        </div>
        <!-- 최근 검색한 단어 -->
        <div v-show="recentWordFocus" class="absolute w-full bg-white border-[1.5px] border-black inputTag">
            <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5 inputTag">최근 검색한 단어</div>
            <div v-for="(word, index) in mainStore.localRecentSearchWords" :key="index" class="flex items-center justify-between px-2 inputTag">
                <button><span @click="wordSearch(word)" class="text-sm inputTag">{{ word }}</span></button>
                <button @click="recentWordDeleteClick(index)" class="flex inputTag"><Icon icon="ph:x"></Icon></button>
            </div>
        </div>
    </div>
</template>