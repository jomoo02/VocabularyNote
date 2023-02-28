<script setup>
import { useStoreStore } from '../stores/store';
import { useModalStore } from '../stores/modal';
import { useDetailWordStore } from '../stores/DetailWord';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';
import ModalTrashcanWord from './ModalTrashcanWord.vue';
import ModalWordDetail from './ModalWordDetail.vue';

const store = useStoreStore();
const modalStore = useModalStore();
const detailStore = useDetailWordStore();

</script>

<template>
    <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
        <template v-if="store.screenTransition === 0">
            <div class="grid md:grid-cols-2 md:gap-x-36">
                <div v-for="(word, index) in store.wordArr" :key="word" class="mb-[32px]">
                    <WordCard :word="word.word" :means="word.means" :check="word.check" :index="index" @detail="(targetWord) => detailStore.detailWordOpen(targetWord)"></WordCard>
                </div>
            </div>
        </template>
        <template v-if="store.screenTransition === 1">
            <div>
                <div v-for="word in store.localTrashCan.values()" :key="word" class="mb-[32px]">
                    <WordTrashCan :word="word.word" :means="word.means.split(',')" :time="word.time" :afterTime="word.afterTime" @trashCanWord="(targetWord) => detailStore.trashCanWordOpen(targetWord)"></WordTrashCan>
                </div>
            </div>
        </template>
        <Teleport to="body">
            <Transition name="slide-fade">
                <ModalWordDetail v-if="modalStore.detailModal" />
            </Transition>
            <Transition name="slide-fade">
                <ModalTrashcanWord v-if="modalStore.trashCanWordModal" />
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