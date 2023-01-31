<template>
    <div class="fixed top-0 z-20 flex w-full justify-between py-2 px-10 md:px-24 lg:px-48 2xl:px-80 bg-[#2E4559] h-16 min-h-16 max-h-16 items-center">
        <!-- icon -->
        <div class="text-4xl font-bold text-white">voca</div>
        <!-- input -->
        <div class="w-1/2 relative">
            <!-- 입력 창 -->
            <div class="h-9 px-3  border flex items-center bg-white border-green-500  relative inputTag">
                <button v-show="inputWord.length > 0" @click="inputWordClear"><Icon icon="ph:x-bold"></Icon></button>
                <input ref=wordSearch_input placeholder="단어를 입력해주세요" :value="inputWord" @keyup.enter="wordSearch" @focus="focusInput"
                @input="event => inputWord = event.target.value" class="w-full px-2 focus:outline-0 inputTag"/>
                <button class="inputTag" @click="wordSearch"><Icon icon="ion:search" width="24" height="24"/></button>
            </div>
            <!-- 최근 검색한 단어 -->
            <div v-show="recentWordFoucs" class="absolute w-full bg-white inputTag border border-green-500">
                <div class="text-[12px] text-slate-500 font-semibold px-2 py-0.5 inputTag">최근 검색한 단어</div>
                <div v-for="(word, index) in store.recentWordsDic" :key="index" class=" px-2 flex items-center justify-between inputTag">
                    <button><span @click="wordSearch(word)" class="text-sm inputTag">{{ word }}</span></button>
                    <button @click="store.recentWordDelete(index)" class="inputTag flex"><Icon icon="ph:x"></Icon></button>
                </div>
            </div>
        </div>

        <!-- btn -->
        <button class="" @click="contentChangeClick">
            <Icon icon="ph:trash" width="34" height="34" color="#e4e4e7" :class="store.screenTransition === 0 ? 'block':'hidden'" />
            <Icon icon="ph:notepad" width="34" height="36" color="#e4e4e7" :class="store.screenTransition === 1 ? 'block':'hidden'"/>
        </button>

        <Teleport to="body">
            <Modal v-if="store.inputModal">
                <template #word>
                    <div class="text-4xl my-5 pb-4 font-bold">{{word}}</div>
                </template>
                <template #means>
                    <div v-for="mean in means" :key="mean" class="font-semibold text-lg">
                        - {{ mean }}
                    </div>
                </template>
                <template #footer>
                    <div class="flex absolute bottom-0 right-0 p-6 gap-x-4">
                        <button @click="modalExit" class="py-1 px-2.5 rounded-md text-white font-semibold bg-neutral-400 hover:bg-neutral-500">cancel</button>
                        <button @click="store.wordAdd(word, means)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-emerald-400  hover:bg-emerald-600">add</button>
                    </div>
                </template>
            </Modal>

            <Modal v-if="store.inputElseModal">
                <template #word>
                    <div class="text-4xl my-5 pb-4 font-bold">{{word}}</div>
                </template>
                <template #means>
                    <div v-for="mean in means" :key="mean" class="font-semibold text-lg">
                        {{ mean }}
                    </div>
                    <div v-for="similarWord in similarWords" :key="similarWord" @click="similarWordClick(similarWord)" class="font-semibold text-lg hover:text-xl cursor-pointer leading-[32px] h-[32px] hover:leading-[32px]">
                        {{ similarWord }}
                    </div>
                </template>
                <template #footer>
                    <div class="flex absolute bottom-0 right-0 p-6">
                        <button @click="store.inputElseModal = false" class="py-1 px-3.5 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600">ok</button>
                    </div>
                </template>
            </Modal>
        </Teleport>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useStoreStore } from '@/stores/store';
import Modal from './Modal.vue';
import { onKeyStroke } from '@vueuse/core'
const store = useStoreStore();
const wordSearch_input = ref();
const inputWord = ref('');
const recentWordFoucs = ref(false);

const word = ref('');
const means = ref([]);
const similarWords = ref('');

const focusInput = () => {
    recentWordFoucs.value = true;
}
const outFocusInput = (e) => {
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && !e.target.classList.contains('inputTag')) {
        recentWordFoucs.value = false;
    }
}
onKeyStroke(['Escape'], (e) => {
    if (store.inputModal || store.detailModal || store.trashCanWordModal || store.inputElseModal) {
        modalExit();
    }

});

function modalExit() {
    store.inputModal = false;
    store.detailModal = false;
    store.trashCanWordModal = false;
    store.inputElseModal = false;

}



onKeyStroke(['Enter'], (e) => {
    if (store.inputModal) {
        recentWordFoucs.value = false;
        store.wordAdd(word.value, means.value);
    }
    if (store.inputElseModal) {
        recentWordFoucs.value = false;
        store.inputElseModal = false;
    }

});
onMounted(() => {
    console.log("onMounted:")
    window.addEventListener('click', outFocusInput);
})
onBeforeUnmount(() => {
    console.log("onBeforeUnmount:")
    window.removeEventListener('click', outFocusInput);
})

function contentChangeClick() {
    store.contentChange();
    if (store.screenTransition === 1) {
        wordSearch_input.value.disabled = true;
    }
    else {
        wordSearch_input.value.disabled = false;
    }
}

async function wordSearch(searchWord) {
    word.value ='';
    means.value = [];
    similarWords.value = [];
    const tagetWord = typeof searchWord === 'string' ? searchWord : inputWord.value 

    // 빈 단어 입력했을때
    if (tagetWord === '') {
        window.alert("단어를 입력해 주세요.");
        wordSearch_input.value.focus();
        return;
    }

    // <input> 사용 불가
    wordSearch_input.value.disabled = true;

    console.log("input:", tagetWord)
    const data = await axios.get(`/search/language/v1/search.json?cate=lan&q=${tagetWord}`); 
    console.log(data);

    // 없는 단어일 떄 (유사 단어도 없음)
    if (data.data.items.lan.length === 0) {
        console.log("zero");
        word.value = inputWord.value;
        means.value = ['없는 단어입니다.', '다른 단어를 입력해 주세요.'];
        store.inputElseModal = true;
     
    }
    // 없는 단어가 아님
    else{
        const wordAndMean = [wordAndMeanSplit(data)][0];
        console.log(wordAndMean);
        console.log(wordAndMean[0]);
        // 단어와 다름 그러나 유사 단어 o
        if (tagetWord !== wordAndMean[0][1]) {
            word.value = `${inputWord.value}와 유사한 단어들`
            const similarWordTemp = [];
            const MAX = wordAndMean.length >= 3 ? 3 : wordAndMean.length;
            for (let i = 0; i < MAX; i++) {
                similarWordTemp.push(wordAndMean[i][1]);
            }
            similarWords.value = [...similarWordTemp];
            store.inputElseModal = true;
            console.log(tagetWord)
        }
        // 정상 동작
        else{
            word.value = wordAndMean[0][1];
            means.value = wordAndMean[0][2].split(',');
            store.wordRecent(word.value); 
            store.inputModal = true;

        }

    }
    inputWord.value = '';
    wordSearch_input.value.disabled = false;
    recentWordFoucs.value = false;


}

function wordAndMeanSplit(data) {
    const searchWordMean = [];
    data.data.items.lan.forEach(item => {
        searchWordMean.push(item.item.split('|'));
    });
    return searchWordMean;
}
function inputWordClear() {
    inputWord.value = '';
}
function similarWordClick(targetWord) {
    modalExit();
    wordSearch(targetWord);

}

</script>

