<template>
    <n-card header-style="padding-top:0; padding-bottom:0; " :bordered="false"
        content-style="padding:0 0 0 30px; display: flex; flex-direction:column; justify-content:center"
        footer-style="display: flex;
        align-items: start;
        justify-content: right;
        margin: 0;
        padding-top: 0;
        padding-bottom: 0;">
        <template #header>
            <div class="word-text">
                {{word}}
            </div>
        </template>
        <template #header-extra>
            <div class="smallscrenn-check-btn-box">
                <n-button class="smallscrenn-check-btn" text @click="detail_word(means,word)">
                    <check></check>
                </n-button>
            </div>
        </template>
        <template #footer>
            <div class="largescreen-check-btn-box">
                <n-button class="largescreen-check-btn" text @click="detail_word(means,word)">
                    <check></check>
                </n-button>
            </div>
        </template>
        <div v-if="meansLength==1">
            <div v-for="mean in means">
                <span class="mean-text">- {{mean}}</span>
            </div>
            <div class="space-text">&nbsp;</div>
            <div class="space-text">&nbsp;</div>
        </div>
        <div v-else-if="meansLength==2">
            <div v-for="mean in means">
                <span class="mean-text">- {{mean}}</span>
            </div>
            <div class="space-text">&nbsp;</div>
        </div>
        <div v-else>
            <div v-for="mean in means">
                <span class="mean-text">- {{mean}}
                </span>
            </div>
        </div>
    </n-card>

</template>

<script setup>
import axios from 'axios';
import { defineComponent,h } from "vue"
import { NButton, NCard, NH4, NIcon, useMessage, useDialog, NAvatar } from 'naive-ui'
import { useIndexStore } from '../store/index.js'
import { rgb2hsl } from 'seemly';
import square from './icons/square.vue';
import check from './icons/check.vue'
const props = defineProps({
    means: Array,
    word: String,
    cardIndex: Number,
})
const itemList = useIndexStore()
const message = useMessage()
const dialog = useDialog()
let meansLength = props.means.length;

const detail_word = ((means,word) => {
    dialog.create({
        title: () =>
            h("h2", word)
        ,
        content: () =>
            h(
                "h3",
                means.map((data) => {
                    return h('div', data)
                })
            ),
        positiveText: 'delete',
        onPositiveClick: () => {
            itemList.deletWord(word,props.cardIndex)
        },
        negativeText: 'cancel',
        icon: () => h(square, { color: "black" }),
        maskClosable: false,
        onEsc: () => {
            message.success("cancel", {
                showIcon: false
            });
        },
        onNegativeClick: () => {
            message.success("cancel", {
                showIcon: false
            });
        },

    })
 
})


</script>

<style scoped>
.n-card{
    background: none;
    flex-direction: row;
}

@media(max-width: 600px){
    .n-card{
        flex-direction: column;
    }
}
.word-text{
    white-space: nowrap;
    font-size: 32px;
    height: 4.6rem;
    line-height: 4.6rem;
}

.mean-text{
    font-size:18px;
    height: 2.3rem;
    line-height: 2.3rem;
}

.space-text{
    line-height: 2.3rem;
    height: 2.3rem;
}
.smallscrenn-check-btn {
    line-height: 2.3rem;
    height: 2.3rem;
    display: none;

}
.largescreen-check-btn{
    line-height: 2.3rem;
    height: 2.3rem;
  

}
.check-btn{
    margin: 0;
    font-size:2.3rem;
}

@media(max-width: 600px) {
    .check-btn {
        margin: 0;
    }
    .word-text {
        font-size: 32px;
        height: 4.6rem;
        line-height: 4.6rem;
    }
    .space-text {
        line-height:0;
        height: 0;
    }
    .largescreen-check-btn {
        display: none;

    }
    .smallscrenn-check-btn {
        display: contents;

    }
}
</style>