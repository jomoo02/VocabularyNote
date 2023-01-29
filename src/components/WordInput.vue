<template>
    <div class="fixed top-0 z-20 flex w-full justify-between py-2 px-10 md:px-24 lg:px-48 2xl:px-80  bg-[#2E4559] h-16 min-h-16 max-h-16 items-center">
        <!-- icon -->
        <div class="text-4xl font-bold text-[#e4e4e7]">voca</div>
        <!-- input -->
        <div class="w-1/2 relative">
            <!-- 입력 창 -->
            <div class="h-9 px-3  border flex items-center bg-white border-green-500  relative inputTag">
                <button v-show="inputWord.length > 0" @click="inputWordClear"><Icon icon="ph:x-bold"></Icon></button>
                <input ref=wordSearch_input placeholder="단어를 입력해주세요" :value="inputWord" @keyup.enter="wordSearch" @focus="focusInput"
                @input="event => inputWord = event.target.value" class="w-full px-2  focus:outline-0 inputTag"/>
                <button @click="wordSearch" class="inputTag"><Icon icon="ion:search" width="24" height="24"/></button>
            </div>
            <!-- 최근 검색한 단어 -->
            <div v-if="recentWordFoucs" class="absolute w-full bg-white  inputTag border border-green-500">
                <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5">최근 검색한 단어</div>
                <div v-for="word in store.recentWordsDic" class=" px-2 ">
                    <span @click="wordSearch(word)" class="cursor-pointer text-sm">{{ word }}</span>
                </div>
            </div>
        </div>

        <!-- btn -->
        <button class="" @click="store.contentChange">
            <Icon icon="ph:trash" width="34" height="34" color="#e4e4e7" :class="store.screenTransition === 0 ? 'block':'hidden'" />
            <Icon icon="ph:notepad" width="34" height="36" color="#e4e4e7" :class="store.screenTransition === 1 ? 'block':'hidden'"/>
        </button>

        <Teleport to="body" >
            <ModalWordInput v-if="store.inputModal" :word="word" :means="means"></ModalWordInput>
        </Teleport>
    </div>
</template>


<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useStoreStore } from '@/stores/store';
import ModalWordInput from './ModalWordInput.vue';
const store = useStoreStore();
const wordSearch_input = ref();
const inputWord = ref('');
const recentWordFoucs = ref(false);

const word = ref('');
const means = ref('');

const outFocusInput = (e) => {
    if (!e.target.classList.contains('inputTag')) {
        recentWordFoucs.value = false;
    }
}
const focusInput = () => {
    recentWordFoucs.value = true;
}
onMounted(() => {
    // wordSearch_input.value.focus();
    console.log("onMounted:")
    window.addEventListener('click', outFocusInput);
})
onBeforeUnmount(() => {
    console.log("onBeforeUnmount:")
    window.removeEventListener('click', outFocusInput);
})


async function wordSearch(searchWord) {
    console.log(searchWord,)
    console.log( inputWord.value);
    const tagetWord = typeof searchWord === 'string' ? searchWord : inputWord.value 

    // <input> 사용 불가
    wordSearch_input.value.disabled = true;

    console.log("input:", tagetWord)
    const data = await axios.get(`/search/language/v1/search.json?cate=lan&q=${tagetWord}`); 

    const wordAndMean = [wordAndMeanSplit(data)];
    word.value = wordAndMean[0][1];
    means.value = wordAndMean[0][2].split(',');

    store.wordRecent(word.value);
    store.inputModal = true;

    inputWord.value = '';
    wordSearch_input.value.disabled = false;
    recentWordFoucs.value = false;
}

function wordAndMeanSplit(data) {
    const searchWordMean = [];
    data.data.items.lan.forEach(item => {
        searchWordMean.push(item.item.split('|'));
    });
    return searchWordMean[0];
}
function inputWordClear() {
    inputWord.value = '';
}

</script>

