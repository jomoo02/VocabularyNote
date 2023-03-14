<script setup>
import TheModal from './TheModal.vue';
import { useInputWordStore } from '../stores/InputWord';
import { useModalStore } from '../stores/modal';
import { ref } from 'vue';

const modalStore = useModalStore();
const wordStore = useInputWordStore();
const word = ref('');
const similarWords = ref([]);

const [modalWord, modalSimilarWords] = wordStore.caseSimilarCreate();
word.value = modalWord;
similarWords.value = modalSimilarWords;

function similarWordClick(targetWord) {
    modalStore.modalExit();
    wordStore.wordSearch(targetWord);
}

</script>

<template>
    <TheModal>
        <template #word>
            {{ word }}
        </template>
        <template #means>
            <div v-for="similarWord in similarWords" :key="similarWord" @click="similarWordClick(similarWord)" class="modal_means hover:text-xl cursor-pointer h-[32px] leading-[32px] hover:leading-[32px]">
                {{ similarWord }}
            </div>
        </template>
        <template #footer>
            <div class="flex">
                <button @click="modalStore.modalExit" class="modal_btn px-3.5 bg-blue-500 hover:bg-blue-600">ok</button>
            </div>
        </template>
    </TheModal>
</template>