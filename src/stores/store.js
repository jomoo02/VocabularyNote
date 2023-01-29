import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStoreStore = defineStore('store', () => {

  // modal word detail 
  const detailWord = ref({});
  // const detailtrashCanWord = ref({});

  // input, detail modal check
  const inputModal = ref(false);
  const detailModal = ref(false);
  const trashCanWordModal = ref(false);

  // 휴지통, 메인화면 전환 0: 메인, 1: 휴지통
  const screenTransition = ref(0);

  const localWords = useStorage('words', {}, localStorage);
  const localTrashCan = useStorage('trashCan', [], localStorage);
  const localRecentSearchWords = useStorage('recentWords', [], localStorage);

  const wordDic = ref({});
  const trashCanDic = ref([]);
  const recentWordsDic = ref([]);

  const wordArr = ref([]);


  // start: localStorage에 있는 단어들 set
  function setWordDic() {
    wordDic.value = {...localWords.value};
    wordArr.value = Object.values({...wordDic.value}).sort((a, b) => b.timestamp-a.timestamp);

    // 최근 검색한 단어
    recentWordsDic.value = [...localRecentSearchWords.value];

    // 휴지통 갱신
    // const trashCan = ref([...localTrashCan.value]);
    const date = new Date();
    const timestamp = date.getTime();

    const trashCan = localTrashCan.value.filter((trashCanWord) => trashCanWord.afterTimestamp > timestamp);
    console.log(trashCan);
    trashCanDic.value = [...trashCan];
    localTrashCan.value = [...trashCan];

  }

  // recent word update
  function wordRecent(searchWord) {
    // 중복 확인
    const repeatCheckIndex = localRecentSearchWords.value.findIndex((word) => word === searchWord);

    const recentWords = repeatCheckIndex !== -1 ? [...localRecentSearchWords.value.slice(0, repeatCheckIndex), ...localRecentSearchWords.value.slice(repeatCheckIndex+1)] : [...localRecentSearchWords.value];
    recentWords.length >= 5 ? recentWords.pop() : '';

    localRecentSearchWords.value = [searchWord, ...recentWords];
    recentWordsDic.value = [searchWord, ...recentWords];
  }

  // 최근 단어 삭제
  function recentWordDelete(index) {
    const recentWords = [...localRecentSearchWords.value.slice(0, index), ...localRecentSearchWords.value.slice(index+1)];
    localRecentSearchWords.value = [...recentWords];
    recentWordsDic.value = [...recentWords];
  }

  // word add
  function wordAdd(word, means) {
    if (word in wordDic.value) {
      console.log("true")
      delete wordDic.value[word];
      delete localWords.value[word];
    }
    const meansStr = means.toString();
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const timestamp = date.getTime();
    const item = {word: word, means: meansStr, timestamp: timestamp, time: nowTime, check: true};
  
    localWords.value[word] = item;
    wordDic.value[word] = item;
    wordArr.value = Object.values({...wordDic.value}).sort((a, b) => b.timestamp-a.timestamp);

    inputModal.value = false;
   
  }

  // word delete
  function wordDelete(targetWord) {
    console.log("delete:", targetWord)

    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const timestamp = date.getTime();
    const afterDate = new Date(date.setDate(date.getDate()+14));
    const afterTimestamp = afterDate.getTime();
    const afterTime = `${afterDate.getFullYear()}-${afterDate.getMonth()+1}-${afterDate.getDate()} ${afterDate.getHours()}:${afterDate.getMinutes()}`;

    const deleteWord = { word: targetWord, means: wordDic.value[targetWord].means, time: nowTime, timestamp: timestamp, afterTimestamp: afterTimestamp, afterTime: afterTime };

    delete wordDic.value[targetWord];
    delete localWords.value[targetWord];
    wordArr.value = Object.values({...wordDic.value}).sort((a, b) => b.timestamp-a.timestamp);
    trashCanDic.value = [{...deleteWord}, ...trashCanDic.value];
    localTrashCan.value = [{...deleteWord}, ...localTrashCan.value];

    detailModal.value = false;
  }

  // 화면간 단어 <-> 휴지통 교체
  function contentChange() {
    screenTransition.value = screenTransition.value === 0 ? 1 : 0;
  }

  // word check
  function wordCheck(targetWord, ch) {
    console.log("check:", targetWord, ch)
    wordDic.value[targetWord].check = ch;
    localWords.value[targetWord]['check'] = ch;
    const idx = wordArr.value.findIndex((item) => item.word === targetWord);
    wordArr.value[idx].check = ch;
  }
  
  // word means get
  function getWordMeans(targetWord) {
    return wordDic.value[targetWord].means.split(',')
  }

  // word detail
  function wordDetail(targetWord) {
    const word = targetWord;
    const means = wordDic.value[word].means.split(',');
    const time = wordDic.value[word].time.split(' ')[0];
    detailWord.value = {word: word, means: [...means], time: time};
    detailModal.value = true;
}

  // 휴지통 단어 디테일 
  function trashCanWordDetail(targetIndex) {
    const { word, means, afterTime, time} = localTrashCan.value[targetIndex];
    const detailTrashCanWord = {word:word, means:means.split(','), time:time, afterTime:afterTime, index:targetIndex};
    return detailTrashCanWord
  }

  // 휴지통 단어 완전 삭제
  function trashCanWordDelete(targetIndex) {
    trashCanDic.value = [...localTrashCan.value.slice(0, targetIndex), ...localTrashCan.value.slice(targetIndex+1)];
    console.log(targetIndex);
    trashCanWordModal.value = false;
    localTrashCan.value = [...trashCanDic.value];
  }

  // 휴지통 단어 복원
  function trashCanWordRestore(targetIndex) {
    const word = localTrashCan.value[targetIndex].word;
    const means = localTrashCan.value[targetIndex].means;
    wordAdd(word,means);
    trashCanWordDelete(targetIndex)
  }




  return {detailWord, wordDic, trashCanDic, inputModal, detailModal, trashCanWordModal, screenTransition, recentWordsDic,wordArr, trashCanWordRestore, trashCanWordDelete, trashCanWordDetail, getWordMeans, wordRecent, wordAdd, setWordDic, wordDelete, wordDetail, contentChange, wordCheck, recentWordDelete };
})
