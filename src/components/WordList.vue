<script setup>
import { useStoreStore } from '../stores/store';
import ModalWordDetail from './ModalWordDetail.vue';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';
import ModalWordTrashCan from './ModalWordTrashCan.vue';
import { ref, onMounted, onUnmounted } from 'vue';
const store = useStoreStore();
const detailTrashWord = ref();
function wordDetailOpen(targetWord) {
    store.wordDetail(targetWord);
}
function trashCanWordOpen(targetIndex) {
    detailTrashWord.value = (store.trashCanWordDetail(targetIndex));
    console.log(detailTrashWord.value)
    store.trashCanWordModal = true;
}
console.log(store.wordArr);

</script>

<template>
    <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
        <template v-if="store.screenTransition === 0">
            <div class="grid md:grid-cols-2 md:gap-x-36">
                <div v-for="word in store.wordArr" :key="word.time" class=" mb-[32px]">
                    <WordCard :word="word.word" :means="word.means" :check="word.check" @detail="(targetIndex) => wordDetailOpen(targetIndex)"></WordCard>
                </div>
            </div>
        </template>
        <template v-if="store.screenTransition === 1">
            <div>
                <div v-for="(word, index) in store.trashCanDic" :key="index" class="mb-[32px]">
                    <WordTrashCan :word="word.word" :means="word.means.split(',')" :time="word.time" :afterTime="word.afterTime" :index="index" @trashCanWord="(targetWord) => trashCanWordOpen(targetWord)"></WordTrashCan>
                </div>
            </div>
        </template>
        <Teleport to="body">
                <ModalWordDetail v-if="store.detailModal" :word="store.detailWord.word" :means="store.detailWord.means" :time="store.detailWord.time"></ModalWordDetail>
                <ModalWordTrashCan v-if="store.trashCanWordModal" :word="detailTrashWord.word" :means="detailTrashWord.means" :time="detailTrashWord.time" :afterTime="detailTrashWord.afterTime" :index="detailTrashWord.index"></ModalWordTrashCan>
        </Teleport>

    </div>
</template>