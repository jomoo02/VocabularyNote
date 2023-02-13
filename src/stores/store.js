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

  function getTimeAndTimestamp() {
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const timestamp = date.getTime();

    return { date, nowTime, timestamp };
  }

  function getTimeAndTimestampAfterDay(day) {
    const { date, nowTime, timestamp} = getTimeAndTimestamp();

    const afterDate = new Date(date.setDate(date.getDate() + day));
    const afterTimestamp = afterDate.getTime();
    const afterTime = `${afterDate.getFullYear()}-${afterDate.getMonth()+1}-${afterDate.getDate()} ${afterDate.getHours()}:${afterDate.getMinutes()}`;
    
    return { nowTime, timestamp, afterTime, afterTimestamp };
  }

  function wordArrUpdate() {
    wordArr.value = Object.values({...localWords.value}).sort((a, b) => b.timestamp-a.timestamp);
  }

  function trashCanWordExistenceCheck(targetWord) {
    return localTrashCan.value.findIndex((trashWord) => trashWord.word === targetWord);
  }

  // init: localStorage에 있는 단어들 set
  function setWordDic() {
    wordArrUpdate();

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
    const { nowTime, timestamp } = getTimeAndTimestamp();
    const item = { word, means: means.toString(), timestamp, time: nowTime, check: true };
  
    localWords.value[word] = item;
    wordArrUpdate();

    modalStore.modalExit();
  }

  // word delete
  function wordDelete(targetWord) {
    console.log("delete:", targetWord)
    const idx = trashCanWordExistenceCheck(targetWord);

    if (idx !== -1) {
      trashCanWordKill(idx);
    }

    const { nowTime, timestamp, afterTime, afterTimestamp} = getTimeAndTimestampAfterDay(14);
    const deleteWord = { word: targetWord, means: localWords.value[targetWord].means, time: nowTime, timestamp, afterTimestamp, afterTime };
    delete localWords.value[targetWord];

    wordArrUpdate();
    localTrashCan.value = [{...deleteWord}, ...localTrashCan.value];

    modalStore.modalExit();
  }

  // 화면간 단어 <-> 휴지통 교체
  function contentChange() {
    screenTransition.value = screenTransition.value === 0 ? 1 : 0;
  }

  // word check
  function wordCheck(targetWord, ch, index) {
    wordArr.value[index].check = ch;
    localWords.value[targetWord].check = ch;
  }
  

  // word detail
  function wordDetail(targetWord) {
    const { word, means, time } = localWords.value[targetWord];
    const detailWord = { word, means: means.split(','), time };
    return detailWord;
}

  // trashCan word detail
  function trashCanWordDetail(targetIndex) {
    const { word, means, afterTime, time } = localTrashCan.value[targetIndex];
    const detailTrashCanWord = { word, means: means.split(','), time, afterTime, index: targetIndex };
    return detailTrashCanWord;
  }

  // trashCan word kill
  function trashCanWordKill(targetIndex) {
    localTrashCan.value = [...localTrashCan.value.slice(0, targetIndex), ...localTrashCan.value.slice(targetIndex+1)];
    modalStore.modalExit();
  }

  // trashCan word restore
  function trashCanWordRestore(targetIndex) {
    const word = localTrashCan.value[targetIndex].word;
    const means = localTrashCan.value[targetIndex].means;
    wordAdd(word, means);
    trashCanWordKill(targetIndex);
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
    trashCanWordKill, 
    trashCanWordDetail, 
    recentWordDelete, 
  };
})
