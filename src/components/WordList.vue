<script setup>
import { useStoreStore } from '../stores/store';
import { ref } from 'vue';
import { useModalStore } from '../stores/modal';
import Modal from './Modal.vue';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';

const store = useStoreStore();
const modalStore = useModalStore();
const detailWord = ref();
const detailTrashWord = ref();

function wordDetailOpen(targetWord) {
    detailWord.value = store.wordDetail(targetWord);
    modalStore.detailModal = true;
}

function trashCanWordOpen(targetWord) {
    console.log(targetWord)
    detailTrashWord.value = store.trashCanWordDetail(targetWord);
    modalStore.trashCanWordModal = true;
}
</script>

<template>
    <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
        <template v-if="store.screenTransition === 0">
            <div class="grid md:grid-cols-2 md:gap-x-36">
                <div v-for="(word, index) in store.wordArr" :key="word" class="mb-[32px]">
                    <WordCard :word="word.word" :means="word.means" :check="word.check" :index="index" @detail="(targetWord) => wordDetailOpen(targetWord)"></WordCard>
                </div>
            </div>
        </template>
        <template v-if="store.screenTransition === 1">
            <div>
                <div v-for="word in store.localTrashCan.values()" :key="word" class="mb-[32px]">
                    <WordTrashCan :word="word.word" :means="word.means.split(',')" :time="word.time" :afterTime="word.afterTime" @trashCanWord="(targetWord) => trashCanWordOpen(targetWord)"></WordTrashCan>
                </div>
            </div>
        </template>
        <Teleport to="body">
            <Transition name="slide-fade">
                <Modal v-if="modalStore.detailModal">
                    <template #word>
                        {{ detailWord.word }}
                    </template>
                    <template #means>
                        <li v-for="mean in detailWord.means" :key="mean" class="modal_means">
                            {{ mean }}
                        </li> 
                    </template>
                    <template #footer>
                        <div class="flex justify-end modal_timetext">{{ detailWord.time }}</div>
                        <div class="flex gap-x-4">
                            <button @click="modalStore.detailModal = false" class="modal_btn bg-neutral-400 hover:bg-neutral-500">cancel</button>
                            <button @click="store.wordDelete(detailWord.word)" class="modal_btn bg-rose-400 hover:bg-rose-600">delete</button>
                        </div>
                    </template>
                </Modal>
            </Transition>
            <Transition name="slide-fade">
                <Modal v-if="modalStore.trashCanWordModal">
                    <template #word>   
                        {{ detailTrashWord.word }}
                    </template>
                    <template #means>
                        <li v-for="mean in detailTrashWord.means" :key="mean" class="modal_means">
                            {{ mean }}
                        </li> 
                    </template>
                    <template #footer>
                        <div class="modal_timetext">
                            <div>삭제한 날짜: {{ detailTrashWord.time }}</div>
                            <div>삭제될 날짜: {{ detailTrashWord.afterTime }}</div>
                        </div>
                        <div class="flex gap-x-4 justify-end">
                            <button @click="store.trashCanWordRestore(detailTrashWord.word)" class="modal_btn bg-emerald-400 hover:bg-emerald-500">restore</button>
                            <button @click="store.trashCanWordKill(detailTrashWord.word)" class="modal_btn bg-rose-400 hover:bg-rose-600">delete</button>
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