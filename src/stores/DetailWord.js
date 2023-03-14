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
        modalStore.detailModal = true;
    }

    function trashCanDetailWordOpen(targetWord) {
        trashCanDetailWord.value = mainStore.trashCanWordDetail(targetWord);
        modalStore.trashCanWordModal = true;
    }

    function trashCanDetailWordModalCreate() {
        return trashCanDetailWord.value;
    }

    function detailWordModalCreate() {
        return detailWord.value;
    }

    return {
        detailWordOpen,
        detailWordModalCreate,
        trashCanDetailWordOpen,
        trashCanDetailWordModalCreate
    };
});