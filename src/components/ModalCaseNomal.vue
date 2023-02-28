<script setup>
import TheModal from './TheModal.vue';
import { useMainStore } from '../stores/Main';
import { useInputWordStore } from '../stores/InputWord';
import { useModalStore } from '../stores/modal';
import { ref } from 'vue';

const mainStore = useMainStore();
const modalStore = useModalStore();
const wordStore = useInputWordStore();
const word = ref('');
const means = ref('');


const [modalWord, modalMeans] = wordStore.caseNomalCreate();
word.value = modalWord;
means.value = modalMeans;

</script>

<template>
    <TheModal>
        <template #word>
            {{ word }}
        </template>
        <template #means>
            <li v-for="mean in means" :key="mean" class="modal_means">
                {{ mean }}
            </li>
        </template>
        <template #footer>
            <div class="flex gap-x-4 justify-end">
                <button @click="modalStore.modalExit" class="modal_btn bg-neutral-400 hover:bg-neutral-500">cancel</button>
                <button @click="mainStore.wordAdd(word, means)" class="modal_btn bg-emerald-400 hover:bg-emerald-600">add</button>
            </div>
        </template>
    </TheModal>
</template>