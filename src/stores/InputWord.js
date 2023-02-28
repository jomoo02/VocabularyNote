import { defineStore } from 'pinia';
import { ref } from 'vue'; 
import { useStoreStore } from './store';
import { useModalStore } from './modal';
import { fetchWordList } from '../../api';

export const useInputWordStore = defineStore('inputWord', () => {
    const store = useStoreStore();
    const modalStore = useModalStore();

    const modalWord = ref('');
    const modalMeans = ref('');
    const modalSimilarWords = ref('');

    function dataInitialization() {
        modalWord.value ='';
        modalMeans.value = [];
        modalSimilarWords.value = [];
    }
 
    function createSimilarWords(wordAndMean) {

        const MAX = wordAndMean.length >= 3 ? 3 : wordAndMean.length;
        return wordAndMean.slice(0, MAX).map(item => item[1]);
    }
    function checkWordSame(word1, word2) {
        const w1 = word1.toLowerCase();
        const w2 = word2.toLowerCase();
        console.log(w1, w2)
        if (w1 === w2) {
            return true;
        }
        return false;
    }

    function caseNotExistenceWord(targetWord) {
        dataInitialization();
        modalWord.value = targetWord;
        modalMeans.value = ['없는 단어입니다.', '다른 단어를 입력해 주세요.'];
        modalStore.inputNotExistModal = true;
    }
    function caseSimilarWord(targetWord, wordAndMean) {
        dataInitialization();
        modalWord.value = `${targetWord}와(과) 유사한 단어들`;
        modalSimilarWords.value = [...createSimilarWords(wordAndMean)];
        modalStore.inputSimilarModal = true;
    }
    function caseNomalWord(wordAndMean) {
        dataInitialization();
        modalWord.value = wordAndMean[0][1];
        modalMeans.value = wordAndMean[0][2].split(',');
        store.wordRecentUpdate(modalWord.value); 
        modalStore.inputModal = true;
        console.log(modalWord.value, modalMeans.value);
    }
    function wordAndMeanSplit(data) {
        const searchWordMean = [];
        data.data.items.lan.forEach(item => {
            searchWordMean.push(item.item.split('|'));
        });
        return searchWordMean;
    }
    async function wordSearch(searchWord) {
        const data = await fetchWordList(searchWord);

        if (data.data.items.lan.length === 0) {
            caseNotExistenceWord(searchWord);
        }
        else {
            const wordAndMean = [...wordAndMeanSplit(data)];
           
            checkWordSame(searchWord, wordAndMean[0][1]) ? caseNomalWord(wordAndMean) : caseSimilarWord(searchWord, wordAndMean);
        }
    }

    function caseNomalCreate() {
        return [modalWord.value, modalMeans.value];
    }
    function caseNotExistCreate() {
        return [modalWord.value, modalMeans.value];
    }
    function caseSimilarCreate() {
        console.log(modalWord.value)
        console.log(modalSimilarWords.value)
        return [modalWord.value, modalSimilarWords.value];
    }
    

    return {
        caseNotExistenceWord,
        caseSimilarWord,
        caseNomalWord,
        wordSearch,
        caseNomalCreate,
        caseNotExistCreate,
        caseSimilarCreate,
        
    }

});