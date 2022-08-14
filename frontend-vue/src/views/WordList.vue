<template>
    <div v-for="(item, index) in itemList.words" class="card-container">
        <n-messageProvider>
            <n-dialogProvider>
                <WordCard v-bind:word="item.word" v-bind:means="item.mean" v-bind:cardIndex="index">
                </WordCard>
            </n-dialogProvider>
        </n-messageProvider>
    </div>
</template>

<script setup>
import WordCard from '../components/WordCard.vue';
import { useIndexStore } from '../store/index.js'
import { NDialogProvider, NMessageProvider, } from 'naive-ui';


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