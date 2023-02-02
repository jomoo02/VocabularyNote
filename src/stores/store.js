import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useModalStore } from './modal'

export const useStoreStore = defineStore('store', () => {

  const modalStore = useModalStore();


  // 휴지통, 메인화면 전환 0: 메인, 1: 휴지통
  const screenTransition = ref(0);

  const localWords = useStorage('words', {}, localStorage);
  const localTrashCan = useStorage('trashCan', [], localStorage);
  const localRecentSearchWords = useStorage('recentWords', [], localStorage);

  const wordArr = ref([]);


  function getTimeAndTimestamp(day = 0) {
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const timestamp = date.getTime();

    if (day !== 0) {
      const afterDate = new Date(date.setDate(date.getDate() + day));
      const afterTimestamp = afterDate.getTime();
      const afterTime = `${afterDate.getFullYear()}-${afterDate.getMonth()+1}-${afterDate.getDate()} ${afterDate.getHours()}:${afterDate.getMinutes()}`;
      return { nowTime, timestamp, afterTime, afterTimestamp };
    }
    return { nowTime, timestamp };
  }

  // start: localStorage에 있는 단어들 set
  function setWordDic() {
    wordArr.value = Object.values({...localWords.value}).sort((a, b) => b.timestamp-a.timestamp);

    // 휴지통 갱신
    const { timestamp } = getTimeAndTimestamp();

    const trashCan = localTrashCan.value.filter((trashCanWord) => trashCanWord.afterTimestamp > timestamp);
    localTrashCan.value = [...trashCan];
  }

  // recent word update
  function wordRecentUpdate(searchWord) {
    // 중복 확인
    const repeatCheckIndex = localRecentSearchWords.value.findIndex((word) => word === searchWord);
    const recentWords = repeatCheckIndex !== -1 ? [...localRecentSearchWords.value.slice(0, repeatCheckIndex), ...localRecentSearchWords.value.slice(repeatCheckIndex+1)] : [...localRecentSearchWords.value];
    recentWords.length >= 5 ? recentWords.pop() : '';

    localRecentSearchWords.value = [searchWord, ...recentWords];
  }

  // 최근 단어 삭제
  function recentWordDelete(index) {
    const recentWords = [...localRecentSearchWords.value.slice(0, index), ...localRecentSearchWords.value.slice(index+1)];
    localRecentSearchWords.value = [...recentWords];
  }

  // word add
  function wordAdd(word, means) {
    // 중복 삭제
    if (word in localWords.value) {
      delete localWords.value[word];
    }
    const meansStr = means.toString();
    const { nowTime, timestamp } = getTimeAndTimestamp();
    const item = { word: word, means: meansStr, timestamp: timestamp, time: nowTime, check: true };
  
    localWords.value[word] = item;
    wordArr.value = Object.values({...localWords.value}).sort((a, b) => b.timestamp-a.timestamp);

    modalStore.modalExit();
  }

  // word delete
  function wordDelete(targetWord) {
    console.log("delete:", targetWord)
  
    const { nowTime, timestamp, afterTime, afterTimestamp} = getTimeAndTimestamp(14);
    const deleteWord = { word: targetWord, means: localWords.value[targetWord].means, time: nowTime, timestamp: timestamp, afterTimestamp: afterTimestamp, afterTime: afterTime };
    delete localWords.value[targetWord];

    wordArr.value = Object.values({...localWords.value}).sort((a, b) => b.timestamp-a.timestamp);
    localTrashCan.value = [{...deleteWord}, ...localTrashCan.value];

    modalStore.modalExit();
  }

  // 화면간 단어 <-> 휴지통 교체
  function contentChange() {
    screenTransition.value = screenTransition.value === 0 ? 1 : 0;
  }

  // word check
  function wordCheck(targetWord, ch) {
    localWords.value[targetWord].check = ch;
    const idx = wordArr.value.findIndex((item) => item.word === targetWord);
    wordArr.value[idx].check = ch;
  }
  

  // word detail
  function wordDetail(targetWord) {
    const word = targetWord;
    const means = localWords.value[word].means.split(',');
    const time = localWords.value[word].time.split(' ')[0];
    const detailWord = { word: word, means: [...means], time: time };
    return detailWord;
}

  // trashCan word detail
  function trashCanWordDetail(targetIndex) {
    const { word, means, afterTime, time } = localTrashCan.value[targetIndex];
    const detailTrashCanWord = { word: word, means: means.split(','), time: time, afterTime: afterTime, index: targetIndex };
    return detailTrashCanWord;
  }

  // trashCan word 완전 삭제
  function trashCanWordDelete(targetIndex) {
    localTrashCan.value = [...localTrashCan.value.slice(0, targetIndex), ...localTrashCan.value.slice(targetIndex+1)];
    modalStore.modalExit();
  }

  // trashCan word restore
  function trashCanWordRestore(targetIndex) {
    const word = localTrashCan.value[targetIndex].word;
    const means = localTrashCan.value[targetIndex].means;
    wordAdd(word, means);
    trashCanWordDelete(targetIndex)
  }

  return { localWords, localTrashCan, localRecentSearchWords, wordArr, screenTransition, 
    setWordDic,
    wordAdd,
    wordRecentUpdate,
    wordDetail,
    wordDelete,
    wordCheck, 
    contentChange,
    trashCanWordRestore, 
    trashCanWordDelete, 
    trashCanWordDetail, 
    recentWordDelete, 
  };
})
