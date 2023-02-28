import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        inputModal: false,
        inputNotExistModal: false,
        inputSimilarModal: false,
        detailModal: false,
        trashCanWordModal: false,

    }),
    actions: {
        modalExit() {
            this.inputModal = false;
            this.inputNotExistModal = false;
            this.inputSimilarModal = false;
            this.detailModal = false;
            this.trashCanWordModal = false;

        }
    }
});