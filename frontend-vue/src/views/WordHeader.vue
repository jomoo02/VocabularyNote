<template>
    <div class="header-container">
        <div class="symbol-container">
            <logo></logo>
            <span class="symbol-content">voca</span>
        </div>
        <div class="inputBox-container">
            <n-input v-model:value="searchWord" round placeholder="search" clearable class="inputBox"
                v-on:keyup.enter="getData(searchWord), spinnerplay()"></n-input>
        </div>
        <div class="searchBtn-container">
            <n-button text class="searchBtn" @click="getData(searchWord), spinnerplay()">
                <search></search>
            </n-button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref,reactive,h } from "vue"
import { NButton, NIcon, NInput, NAvatar, useDialog, useMessage,} from "naive-ui"
import { useIndexStore } from '../store/index.js'
import square from '../components/icons/square.vue';
import logo from '../components/icons/logo.vue';
import search from '../components/icons/search.vue';

const itemList = useIndexStore();
const dialog = useDialog();
const message = useMessage();
let searchWord = ref(null);
let searchData = reactive({});
let sortData = [];

const spinnerplay = (() => {
    itemList.showConvert()
});

const getData = ((word) => {
    if (!word) {
        message.error("단어를 입력해주세요")
        spinnerplay()
    }
    else {
        searchWord.value = '';
        let wordToLower = word.toLowerCase();
        console.log(word)
        axios.post("/search", { word: wordToLower })
            .then((res) => {
                searchData['mean']
                searchData = res.data;
                if (searchData['check'] != -1) {
                    sortData = searchData['mean']
                }
            })
            .catch(error => {
                console.log("wordheader error line 55: ",error)
            })
            // searchData['check'] == 0: 정상적인 리턴, -1: 검색결과가 없음, 1: 잘못된 단어로 비슷한 단어들 리턴
            .finally(() => {
                spinnerplay()
                // 검색결과가 없음
                if (searchData['check'] == -1) {
                    dialog.create({
                        title: () =>
                            h("h2", word),
                        content: () =>
                            h("h3", "검색 결과가 없습니다"),
                        maskClosable: false,
                        icon: () => h(square, { color: "black" }),
                        onMaskClick: () => {
                            message.error("버튼을 클릭 해주세요");
                        },
                    })
                }
                // 정삭적인 단어의 결과
                else if (searchData['check'] == 0) {
                    if (sortData) {
                        dialog.create({
                            title: () =>h("h2", word),
                            content: () =>
                                h("h3", sortData.map((data) => {
                                        return h('div', data)
                                    })
                                ),
                            positiveText: 'add',
                            onPositiveClick: () => {
                                itemList.addWord(word,sortData)
                                message.success("단어가 추가 되었습니다");
                            },
                            maskClosable: false,
                            // onMaskClick: () => {
                            //     message.error("버튼을 클릭 해주세요");
                            // },
                            onEsc: () => {
                                message.success("cancel", {
                                    showIcon: false
                                });
                            },
                            negativeText: 'cancel',
                            onNegativeClick: () => {
                                message.success("cancel", {
                                    showIcon: false
                                });
                            },
                            icon: () => h(square, { color: "black" })
                        })
                    }
                    else {
                        message.error("없는 단어 입니다")
                    }
                }
                // relate word
                else {
                    dialog.create({
                        title: () =>
                            h("h2", "잘못된 단어 입니다"),
                        content: () =>
                            h(
                                "h3", [
                                h('div', [word, "와 비슷한 단어들"]),
                                sortData.map((data) => {
                                    return h('div', data)
                                })
                                ]
                            ),
                        maskClosable: false,
                        icon: () => h(square, { color: "black" }),
                        onMaskClick: () => {
                            message.error("버튼을 클릭 해주세요");
                        },
                    })
                }
            })
    }
});
</script>


<style scoped>

.header-container{
    display: grid;
    grid-template-columns: auto 1fr auto;
    width:100%;
}
.symbol-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 8px;
}

.symbol-content{
    color:#FFFFFF;
    margin-left: 5px;
    font-size:1.2rem;
}
.inputBox-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputBox{
    background: #FFFFFF;
    /* background: #9FA3A6; */
    width: 60vw;
}
.searchBtn-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8px;
}
.searchBtn{
    color:#FFFFFF;
    font-size: 30px;
}
@media(max-width: 600px) {

    .symbol-container {
        padding-left: 4px;
    }
    .symbol-content{
        font-size:1.1rem;
    }
    .searchBtn-container{
        padding-right: 4px;
    }
    .searchBtn-container {
       padding-right: 10px;
    }
}
</style>