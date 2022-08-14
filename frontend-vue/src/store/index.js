import { defineStore } from 'pinia'
import { ref,reactive, isProxy,isReadonly } from 'vue';
import axios from 'axios';
export const useIndexStore = defineStore("wordList", {
    state: () => ({
        words: reactive([]),
        show: ref(false),
    }),

    actions: {
        // words에 단어 추가
        addWord2(word) {
            this.words.push(word);
        },
        showConvert() {
            this.show=!this.show
        },
        // 서버에서 모든 단어들 가져오기
        getData() {
            axios.get("/get")
                 .then((res) => {
                     console.log("get",res)
                     //console.log(res.data['item'])
                    this.words = res.data['item']
                    //console.log("#####success return words", this.words,"#########")
                })
                .catch((error) => {
                    //console.log(error)
                })
        },
        // 서버에 'word'를 삭제한다는 것을 알리고 words에 index를 이용해 삭제
        deletWord(word,index) {
            axios.get("/delete", { params: { word: word } })
                .then((res) => {
                    console.log("delete",res)
                    this.words.splice(index, 1)
                })
                .catch((err) => {
                    console.log("WordCard_delete_err(line 86)", err)
                })
        },
        // words에 word{mean, word} push
        // 서버에 'word'를 words에 push 했음을 알림
        addWord(word, sortData) {
            let addWordList = { mean: sortData, word: word }
            //console.log(addWordList)
            this.words.push(addWordList);

            axios.get(`/insert/${word}`)
                .then((res) => {
                    console.log("insert",res)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

            
    },
});