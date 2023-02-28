import { defineStore } from 'pinia';
import { ref } from 'vue'; 

import { useModalStore } from './modal';
import { useMainStore } from './Main';


export const useDetailWordStore = defineStore('detailWord', () => {
    const mainStore = useMainStore();
    const modalStore = useModalStore();
    const detailWord = ref(null);
    const trashCanDetailWord = ref(null);

    function detailWordOpen(targetWord) {
        detailWord.value = mainStore.wordDetail(targetWord);
        console.log(detailWord.value);
        modalStore.detailModal = true;
    }

    function trashCanWordOpen(targetWord) {
        trashCanDetailWord.value = mainStore.trashCanWordDetail(targetWord);
        modalStore.trashCanWordModal = true;
    }

    function trashCanDetailWordModal() {
        return trashCanDetailWord.value;
    }

    function detailWordModal() {
        return detailWord.value;
    }

    return {
        trashCanWordOpen,
        trashCanDetailWordModal,
        detailWordOpen,
        detailWordModal
    };
});