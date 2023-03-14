<script setup>
import TheModal from './TheModal.vue';
import { useInputWordStore } from '../stores/InputWord';
import { useModalStore } from '../stores/Modal';
import { ref } from 'vue';

const modalStore = useModalStore();
const wordStore = useInputWordStore();
const word = ref('');
const means = ref('');

const [modalWord, modalMeans] = wordStore.caseNotExistCreate();
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
            <div class="flex">
                <button @click="modalStore.modalExit" class="modal_btn px-3.5 bg-blue-500 hover:bg-blue-600">ok</button>
            </div>
        </template>
    </TheModal>
</template>