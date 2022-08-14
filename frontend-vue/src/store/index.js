import { defineStore } from 'pinia'
import { ref,reactive, isProxy,isReadonly } from 'vue';
import axios from 'axios';
export const useIndexStore = defineStore("wordList", {
    state: () => ({
        words: reactive([]),
        show: ref(false),
    }),

    actions: {
        addWord(param) {
            this.words.push(param);
        },
        showConvert() {
            this.show=!this.show
        },
        getData() {
            axios.get("/get")
                 .then((res) => {
                     //console.log(res.data)
                     //console.log(res.data['item'])
                    this.words = res.data['item']
                    //console.log("#####success return words", this.words,"#########")
                })
                .catch((error) => {
                    //console.log(error)
                })

        },
        deletWord(index) {
            console.log(this.words[index])
            console.log(this.words)
            this.words.splice(index,1)
         }
    },
});