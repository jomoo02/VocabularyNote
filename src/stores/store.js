import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStoreStore = defineStore('store', () => {
  const word = ref();
  const means = ref([]);
  const time = ref();
  const detailWord = ref({});

  const inputModal = ref(false);
  const detailModal = ref(false);
  const screenTransition = ref(0);

  const localWords = useStorage('words', [], localStorage);
  const localTrashCan = useStorage('trashCan', [], localStorage);
  const localRecentSearchWords = useStorage('recentWords', [], localStorage);

  const wordDic = ref([]);
  const trashCanDic = ref([]);
  const recentWordsDic = ref([]);

  // start: localStorage에 있는 단어들 set
  function setWordDic() {
    wordDic.value = [...localWords.value.sort((a, b) => b.timestamp-a.timestamp)];

    // 최근 검색한 단어
    recentWordsDic.value = [...localRecentSearchWords.value];

    // 휴지통 갱신
    const trashCan = ref([...localTrashCan.value]);
    const date = new Date();
    const timestamp = date.getTime();

    while (true) {
      let check = true;
      for (let i = 0; i < trashCan.value.length; i++) {
        if (trashCan.value[i].afterTimestamp <= timestamp) {
          console.log(trashCan.value[i].afterTimestamp, timestamp)
          trashCan.value = [...trashCan.value.slice(0,i), ...trashCan.value.slice(i+1)];
          check = false;
          break;
        }
      }
      if (check) {
        break;
      }
    }
    console.log(trashCan.value);
    trashCanDic.value = [...trashCan.value];
    localTrashCan.value = [...trashCan.value];
  }

  // word search
  function wordSearch(searchWordData) {
    const wordMeans = [searchWordData[0]];
    word.value = wordMeans[0][1];
    means.value = wordMeans[0][2].split(',');

    //최근 검색 갱신
    const recentWords = [...localRecentSearchWords.value];
    recentWords.length >= 5 ? recentWords.pop() : '';
    localRecentSearchWords.value = [word.value, ...recentWords];
    recentWordsDic.value = [word.value, ...recentWords];
  
  }
  // word add
  function wordAdd() {
    const meansStr = means.value.toString();
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const timestamp = date.getTime();
    const item = {word: word.value, means: meansStr, timestamp: timestamp, time: nowTime, check: true};
    wordDic.value = [{...item}, ...wordDic.value];
    localWords.value.push({...item});
    inputModal.value = false;
  }

  // word delete
  function wordDelete(target) {
    console.log("delete:", target)
    const targetWord = target;
    let idx = -1;
    for (let i = 0; i < wordDic.value.length; i++) {
      if (wordDic.value[i].word === targetWord) {
        idx = i;
        break;
      } 
    }
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const timestamp = date.getTime();
    const afterDate = new Date(date.setDate(date.getDate()+14));
    console.log(date, afterDate);
    const afterTimestamp = afterDate.getTime();
    const afterTime = `${afterDate.getFullYear()}-${afterDate.getMonth()+1}-${afterDate.getDate()} ${afterDate.getHours()}:${afterDate.getMinutes()}`;


    console.log(nowTime, afterTime);

    const deleteWord = {word: wordDic.value[idx].word, means: wordDic.value[idx].means, time: nowTime, timestamp: timestamp, afterTimestamp: afterTimestamp, afterTime, afterTime };
    const deleteAfterDic = [...wordDic.value.slice(0,idx), ...wordDic.value.slice(idx+1)];
    wordDic.value = [...deleteAfterDic];
    localWords.value = [...deleteAfterDic];

    trashCanDic.value = [{...deleteWord}, ...trashCanDic.value];
    localTrashCan.value = [{...deleteWord}, ...localTrashCan.value];

    detailModal.value = false;
  }

  // word detail
  function wordDetail(targetWord) {
      word.value = targetWord.word;
      means.value = targetWord.means;
      time.value = targetWord.time.split(' ')[0];
      console.log(targetWord)
      detailWord.value = {word: word.value, means: [...means.value], time: time.value, check: targetWord.check};
      detailModal.value = true;
      console.log(detailWord.value)
  }

  // 화면간 단어 <-> 휴지통 교체
  function contentChange() {
    screenTransition.value = screenTransition.value === 0 ? 1 : 0;
  }

  // 워드 check
  function wordCheck(target) {
    console.log("check:", target)
    const targetWord = target;
    let idx = -1;
    for (let i = 0; i < wordDic.value.length; i++) {
      if (wordDic.value[i].word === targetWord) {
        idx = i;
        break;
      } 
    }
    const checkword = wordDic.value[idx];
    checkword.check = !checkword.check; 
    const afterDic = [...wordDic.value.slice(0,idx), {...checkword}, ...wordDic.value.slice(idx+1)];
    wordDic.value = [...afterDic];
    localWords.value = [...afterDic];
    console.log(checkword.check)
    detailModal.value = false;
  }




  return {word, means, detailWord, wordDic, trashCanDic, inputModal, detailModal, screenTransition, recentWordsDic, wordSearch, wordAdd, setWordDic, wordDelete, wordDetail, contentChange, wordCheck };
})
