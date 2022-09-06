<template>
    <div v-for="(item, index) in itemList.words" :key="item.index" class="card-container">
        <n-messageProvider>
            <n-dialogProvider>
                <word-card v-bind:word="item.word" v-bind:means="item.mean" v-bind:cardIndex="index" v-bind:meansLength="item.mean.length">
                </word-card>
            </n-dialogProvider>
        </n-messageProvider>
    </div>
</template>

<script setup>
import WordCard from '../components/WordCard.vue';
import { useIndexStore } from '../store/index.js'
import { NDialogProvider, NMessageProvider,useMessage } from 'naive-ui';


const itemList = useIndexStore()

itemList.getData()

</script>

<style scoped>

.card-container{
    margin-bottom: 2.3rem
}

@media(max-width: 640px) {
    .card-container {
        margin-bottom: calc(2.3rem - 0.0001rem);
    }
}

</style>