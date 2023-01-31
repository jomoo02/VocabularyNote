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
                <Modal v-if="store.detailModal">
                    <template #word>
                        <div class="text-4xl my-5 pb-4 font-bold">{{detailWord.word}}</div>
                    </template>
                    <template #means>
                        <div v-for="mean in detailWord.means" :key="mean" class="font-semibold text-lg">
                            {{ mean }}
                        </div> 
                    </template>
                    <template #footer>
                        <div class="absolute bottom-0 right-0 p-6">
                            <div class="text-sm flex justify-end my-4 text-neutral-400">{{ detailWord.time}}</div>
                            <div class="flex gap-x-4">
                                <button @click="store.detailModal = false" class="py-1 px-2.5 rounded-md text-white bg-neutral-400 hover:bg-neutral-500 font-semibold">cancel</button>
                                <button @click="store.wordDelete(detailWord.word)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-rose-400 hover:bg-rose-600">delete</button>
                            </div>
                        </div>
                    </template>
                </Modal>
                
                <Modal v-if="store.trashCanWordModal">
                    <template #word>   
                        <div class="text-4xl my-5 pb-4 font-bold">{{detailTrashWord.word}}</div>
                    </template>
                    <template #means>
                        <div v-for="mean in detailTrashWord.means" :key="mean" class="font-semibold text-lg">
                            {{ mean }}
                        </div> 
                    </template>
                    <template #footer>
                        <div class="absolute bottom-0 right-0 p-6 ">
                            <div class="text-sm my-4 text-neutral-400">
                                <div>삭제한 날짜: {{ detailTrashWord.time }}</div>
                                <div>삭제될 날짜: {{ detailTrashWord.afterTime }}</div>
                            </div>
                            <div class="flex gap-x-4 justify-end">
                                <button @click="store.trashCanWordRestore(detailTrashWord.index)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-emerald-400 hover:bg-emerald-500">restore</button>
                                <button @click="store.trashCanWordDelete(detailTrashWord.index)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-rose-400 hover:bg-rose-600">delete</button>
                            </div>
                        </div>
                    </template>
                </Modal>
        </Teleport>

    </div>
</template>