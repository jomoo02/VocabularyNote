<script setup>
import { useStoreStore } from '../stores/store';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';
import { ref } from 'vue';
import Modal from './Modal.vue';

const store = useStoreStore();

const detailWord = ref();
const detailTrashWord = ref();

function wordDetailOpen(targetWord) {
    detailWord.value = store.wordDetail(targetWord);
    store.detailModal = true;
}

function trashCanWordOpen(targetIndex) {
    detailTrashWord.value = store.trashCanWordDetail(targetIndex);
    store.trashCanWordModal = true;
}
</script>

<template>
    <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
        <template v-if="store.screenTransition === 0">
            <div class="grid md:grid-cols-2 md:gap-x-36">
                <div v-for="word in store.wordArr" :key="word.time" class="mb-[32px]">
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
            <Modal v-if="store.detailModal">
                <template #word>
                    <div class="modal_word">{{detailWord.word}}</div>
                </template>
                <template #means>
                    <li v-for="mean in detailWord.means" :key="mean" class="modal_means">
                        {{ mean }}
                    </li> 
                </template>
                <template #footer>
                    <div class="modal_footer">
                        <div class="flex justify-end modal_timetext">{{ detailWord.time }}</div>
                        <div class="flex gap-x-4">
                            <button @click="store.detailModal = false" class="modal_btn bg-neutral-400 hover:bg-neutral-500">cancel</button>
                            <button @click="store.wordDelete(detailWord.word)" class="modal_btn bg-rose-400 hover:bg-rose-600">delete</button>
                        </div>
                    </div>
                </template>
            </Modal>
            
            <Modal v-if="store.trashCanWordModal">
                <template #word>   
                    <div class="modal_word">{{detailTrashWord.word}}</div>
                </template>
                <template #means>
                    <li v-for="mean in detailTrashWord.means" :key="mean" class="modal_means">
                        {{ mean }}
                    </li> 
                </template>
                <template #footer>
                    <div class="modal_footer">
                        <div class="modal_timetext">
                            <div>삭제한 날짜: {{ detailTrashWord.time }}</div>
                            <div>삭제될 날짜: {{ detailTrashWord.afterTime }}</div>
                        </div>
                        <div class="flex gap-x-4 justify-end">
                            <button @click="store.trashCanWordRestore(detailTrashWord.index)" class="modal_btn bg-emerald-400 hover:bg-emerald-500">restore</button>
                            <button @click="store.trashCanWordDelete(detailTrashWord.index)" class="modal_btn bg-rose-400 hover:bg-rose-600">delete</button>
                        </div>
                    </div>
                </template>
            </Modal>
        </Teleport>
    </div>
</template>