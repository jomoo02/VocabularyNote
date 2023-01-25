<script setup>
import { useStoreStore } from '../stores/store';
import ModalWordDetail from './ModalWordDetail.vue';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';
const store = useStoreStore();

</script>

<template>
    <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
        <template v-if="store.screenTransition === 0">
            <div class="grid md:grid-cols-2 md:gap-x-36">
                <div v-for="word in store.wordDic" class=" mb-[32px]">
                    <WordCard :word="word.word" :means="word.means.split(',')" :time="word.time" :check="word.check"></WordCard>
                   
                </div>

            </div>
        </template>
        <template v-if="store.screenTransition === 1">
            <div>
                <div v-for="word in store.trashCanDic" class="mb-[32px]">
                    <WordTrashCan :word="word.word" :means="word.means.split(',')" :time="word.time" :afterTime="word.afterTime"></WordTrashCan>
                </div>
            </div>
        </template>
        <Teleport to="body">
                <ModalWordDetail v-if="store.detailModal" :word="store.detailWord.word" :means="store.detailWord.means" :time="store.detailWord.time" :check="store.detailWord.check"></ModalWordDetail>
        </Teleport>

    </div>
</template>