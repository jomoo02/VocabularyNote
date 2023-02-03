<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import { useStoreStore } from '@/stores/store';
import { useModalStore } from '@/stores/modal';
import { onKeyStroke } from '@vueuse/core'
import axios from 'axios';
import Modal from './Modal.vue';

const store = useStoreStore();
const modalStore = useModalStore();

const wordSearch_input = ref();
const inputWord = ref('');
const recentWordFoucs = ref(false);

const word = ref('');
const means = ref([]);
const similarWords = ref('');


const outFocusInput = (e) => {
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && !e.target.classList.contains('inputTag')) {
        recentWordFoucs.value = false;
    }
}

onMounted(() => {
    console.log("onMounted:")
    window.addEventListener('click', outFocusInput);
});

onBeforeUnmount(() => {
    console.log("onBeforeUnmount:")
    window.removeEventListener('click', outFocusInput);
});

onKeyStroke(['Escape'], (e) => {
    if (modalStore.inputModal || modalStore.detailModal || modalStore.trashCanWordModal || modalStore.inputElseModal) {
        modalStore.modalExit();
    }
});

onKeyStroke(['Enter'], (e) => {
    if (modalStore.inputModal) {
        recentWordFoucs.value = false;
        store.wordAdd(word.value, means.value);
    }
    else if (modalStore.inputElseModal) {
        recentWordFoucs.value = false;
        modalStore.modalExit();
    }
});

function inputTagFoucs() {
    wordSearch_input.value.focus();
}

function inputWordClear() {
    inputWord.value = '';
    inputTagFoucs();
}

function recentWordDeleteClick(index) {
    store.recentWordDelete(index);
    inputTagFoucs();
}

function contentChangeClick() {
    store.contentChange();
    if (store.screenTransition === 1) {
        wordSearch_input.value.disabled = true;
        recentWordFoucs.value = false;
    }
    else {
        wordSearch_input.value.disabled = false;
    }
}
function dataInitialization() {
    word.value ='';
    means.value = [];
    similarWords.value = [];
}

function wordAndMeanSplit(data) {
    const searchWordMean = [];
    data.data.items.lan.forEach(item => {
        searchWordMean.push(item.item.split('|'));
    });
    return searchWordMean;
}

function createSimilarWords(wordAndMean) {
    const MAX = wordAndMean.length >= 3 ? 3 : wordAndMean.length;
    return wordAndMean.slice(0, MAX).map(item => item[1]);
}

function similarWordClick(targetWord) {
    modalStore.modalExit();
    wordSearch(targetWord);
}

function caseEmptyWord() {
    window.alert("단어를 입력해 주세요.");
    inputTagFoucs();
}

function caseNotExistenceWord(targetWord) {
    word.value = targetWord;
    means.value = ['없는 단어입니다.', '다른 단어를 입력해 주세요.'];
    modalStore.inputElseModal = true;
}

function caseSimilarWord(targetWord, wordAndMean) {
    word.value = `${targetWord}와(과) 유사한 단어들`
    similarWords.value = [...createSimilarWords(wordAndMean)];
    modalStore.inputElseModal = true;
}

function caseNomalWord(wordAndMean) {
    word.value = wordAndMean[0][1];
    means.value = wordAndMean[0][2].split(',');
    store.wordRecentUpdate(word.value); 
    modalStore.inputModal = true;
}
function checkWordSame(word1, word2) {
    const w1 = word1.toLowerCase();
    const w2 = word2.toLowerCase();
    console.log(w1, w2)
    if (w1 === w2) {
        return true;
    }
    return false;
}

async function wordSearch(searchWord) {
    const targetWord = searchWord;
    dataInitialization();
    console.log(targetWord);
    if (targetWord === '') {
        caseEmptyWord();
        return;
    }
    // <input> 사용 불가
    wordSearch_input.value.disabled = true;

    const data = await axios.get(`/search/language/v1/search.json?cate=lan&q=${targetWord}`); 

    if (data.data.items.lan.length === 0) {
        caseNotExistenceWord(targetWord);
    }
    else {
        const wordAndMean = [...wordAndMeanSplit(data)];
       
        checkWordSame(targetWord, wordAndMean[0][1]) ? caseNomalWord(wordAndMean) : caseSimilarWord(targetWord, wordAndMean);
    }

    // input 값 초기화, <input> 사용가능, 최근 검색한 단어 끄기
    inputWord.value = '';
    wordSearch_input.value.disabled = false;
    recentWordFoucs.value = false;
}
</script>

<template>
    <div class="fixed top-0 z-20 flex items-center w-full h-16 min-h-16 max-h-16 justify-between py-2 px-2 xs:px-6 sm:px-10 md:px-24 lg:px-48 2xl:px-80 bg-[#2E4559]">
        <!-- icon -->
        <div class="text-2xl md:text-4xl font-bold text-white">voca</div>
        <!-- input -->
        <div class="relative w-3/5 md:w-1/2">
            <!-- 입력 창 -->
            <div class="relative h-9 px-3 border flex items-center bg-white border-black inputTag">
                <button v-show="inputWord.length>0" @click="inputWordClear"><Icon icon="ph:x-bold"></Icon></button>
                <input ref=wordSearch_input placeholder="단어를 입력해주세요" :value="inputWord" @keyup.enter="wordSearch(inputWord)" @focus="recentWordFoucs = true"
                @input="event => inputWord = event.target.value" class="w-full px-2 focus:outline-0 inputTag"/>
                <button class="inputTag" @click="wordSearch(inputWord)"><Icon icon="ion:search" width="24" height="24"/></button>
            </div>
            <!-- 최근 검색한 단어 -->
            <div v-show="recentWordFoucs" class="absolute w-full bg-white border-[1.5px] border-black inputTag">
                <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5 inputTag">최근 검색한 단어</div>
                <div v-for="(word, index) in store.localRecentSearchWords" :key="index" class="flex items-center justify-between px-2 inputTag">
                    <button><span @click="wordSearch(word)" class="text-sm inputTag">{{ word }}</span></button>
                    <button @click="recentWordDeleteClick(index)" class="flex inputTag"><Icon icon="ph:x"></Icon></button>
                </div>
            </div>
        </div>

        <!-- btn -->
        <button @click="contentChangeClick">
            <Icon icon="ph:trash" width="34" height="34" color="#e4e4e7" :class="store.screenTransition === 0 ? 'block' : 'hidden'" />
            <Icon icon="ph:notepad" width="34" height="36" color="#e4e4e7" :class="store.screenTransition === 1 ? 'block' : 'hidden'"/>
        </button>

        <Teleport to="body">
            <Transition name="slide-fade">
                <Modal v-if="modalStore.inputModal">
                    <template #word>
                        {{word}}
                    </template>
                    <template #means>
                        <li v-for="mean in means" :key="mean" class="modal_means">
                            {{ mean }}
                        </li>
                    </template>
                    <template #footer>
                        <div class="flex gap-x-4 justify-end">
                            <button @click="modalStore.modalExit" class="modal_btn bg-neutral-400 hover:bg-neutral-500">cancel</button>
                            <button @click="store.wordAdd(word, means)" class="modal_btn bg-emerald-400 hover:bg-emerald-600">add</button>
                        </div>
                    </template>
                </Modal>
            </Transition>
            <Transition name="slide-fade">
                <Modal v-if="modalStore.inputElseModal">
                    <template #word>
                        {{word}}
                    </template>
                    <template #means>
                        <div v-for="mean in means" :key="mean" class="modal_means">
                            {{ mean }}
                        </div>
                        <div v-for="similarWord in similarWords" :key="similarWord" @click="similarWordClick(similarWord)" class="modal_means hover:text-xl cursor-pointer h-[32px] leading-[32px] hover:leading-[32px]">
                            {{ similarWord }}
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex">
                            <button @click="modalStore.inputElseModal = false" class="modal_btn px-3.5 bg-blue-500 hover:bg-blue-600">ok</button>
                        </div>
                    </template>
                </Modal>
            </Transition>
        </Teleport>
    </div>
</template>


<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translatex(-20px);
    opacity: 0;
}
</style>