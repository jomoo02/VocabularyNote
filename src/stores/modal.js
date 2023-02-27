import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        inputModal: false,
        detailModal: false,
        trashCanWordModal: false,
        inputElseModal: false,
    }),
    actions: {
        modalExit() {
            this.inputModal = false;
            this.detailModal = false;
            this.trashCanWordModal = false;
            this.inputElseModal = false;
        }
    }
});