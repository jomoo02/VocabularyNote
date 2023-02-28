import { defineStore } from 'pinia';
import { ref } from 'vue'; 

import { useModalStore } from './modal';
import { useStoreStore } from './store';


export const useDetailWordStore = defineStore('detailWord', () => {
    const store = useStoreStore();
    const modalStore = useModalStore();
    const detailWord = ref(null);
    const trashCanDetailWord = ref(null);

    function detailWordOpen(targetWord) {
        detailWord.value = store.wordDetail(targetWord);
        console.log(detailWord.value);
        modalStore.detailModal = true;
    }

    function trashCanWordOpen(targetWord) {
        trashCanDetailWord.value = store.trashCanWordDetail(targetWord);
        modalStore.trashCanWordModal = true;
    }
    function trashCanDetailWordModal() {
        return trashCanDetailWord.value;
    }
    function detailWordModal() {
        console.log(detailWord)
        return detailWord.value;
    }
    return {
        trashCanWordOpen,
        trashCanDetailWordModal,
        detailWordOpen,
        detailWordModal
    };
});