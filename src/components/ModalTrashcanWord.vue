<script setup>
import TheModal from './TheModal.vue';
import { useStoreStore } from '../stores/store';
import { ref } from 'vue';
import { useDetailWordStore } from '../stores/DetailWord';


const store = useStoreStore();
const detailWordStore = useDetailWordStore();
const detailTrashWord = ref(null);

detailTrashWord.value = {...detailWordStore.trashCanDetailWordModal()};

</script>

<template>
    <TheModal>
        <template #word>   
            {{ detailTrashWord.word }}
        </template>
        <template #means>
            <li v-for="mean in detailTrashWord.means" :key="mean" class="modal_means">
                {{ mean }}
            </li> 
        </template>
        <template #footer>
            <div class="modal_timetext">
                <div>삭제한 날짜: {{ detailTrashWord.time }}</div>
                <div>삭제될 날짜: {{ detailTrashWord.afterTime }}</div>
            </div>
            <div class="flex gap-x-4 justify-end">
                <button @click="store.trashCanWordRestore(detailTrashWord.word)" class="modal_btn bg-emerald-400 hover:bg-emerald-500">restore</button>
                <button @click="store.trashCanWordKill(detailTrashWord.word)" class="modal_btn bg-rose-400 hover:bg-rose-600">delete</button>
            </div>
        </template>
    </TheModal>
</template>