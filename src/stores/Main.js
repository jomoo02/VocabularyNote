import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useMainStore = defineStore('main', () => {
  // 휴지통, 메인화면 전환 0: 메인, 1: 휴지통
  const screenTransition = ref(0);

  const localWords = useStorage('mapWords', new Map(), localStorage);
  const localTrashCan = useStorage('trashCan', new Map(), localStorage);
  const localRecentSearchWords = useStorage('recentWords', [], localStorage);

  const wordArr = ref([]);

  function getTimeAndTimestamp() {
    const date = new Date();
    const nowTime = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const timestamp = date.getTime();

    return { date, nowTime, timestamp };
  }

  function getTimeAndTimestampAfterDay(day) {
    const { date, nowTime, timestamp } = getTimeAndTimestamp();

    const afterDate = new Date(date.setDate(date.getDate() + day));
    const afterTimestamp = afterDate.getTime();
    const afterTime = `${afterDate.getFullYear()}-${
      afterDate.getMonth() + 1
    }-${afterDate.getDate()} ${afterDate.getHours()}:${afterDate.getMinutes()}`;

    return { nowTime, timestamp, afterTime, afterTimestamp };
  }

  function wordArrUpdate() {
    const localWordsToArr = Array.from(localWords.value, (item) => {
      return { ...item[1] };
    });
    wordArr.value = [...localWordsToArr].reverse();
  }

  // init: localStorage에 있는 단어들 set
  function setWordDic() {
    wordArrUpdate();
    // 휴지통 갱신
    const { timestamp } = getTimeAndTimestamp();
    for (const [key, value] of localTrashCan.value) {
      if (value.afterTimestamp <= timestamp) {
        localTrashCan.value.delete(key);
      }
    }
  }
  // word add
  function wordAdd(word, means) {
    const { nowTime, timestamp } = getTimeAndTimestamp();
    const item = {
      word,
      timestamp,
      means: means.toString(),
      time: nowTime,
      check: false,
    };

    // 이미 단어가 존재하면 지웠다가 저장
    if (localWords.value.has(word)) {
      localWords.value.delete(word);
    }

    localWords.value.set(word, item);
    wordArrUpdate();
  }

  // word check
  function wordCheck(targetWord, ch, index) {
    wordArr.value[index].check = ch;
    const checkedWord = localWords.value.get(targetWord);
    checkedWord.check = ch;
    localWords.value.set(targetWord, checkedWord);
  }

  // word delete
  function wordDelete(targetWord) {
    const { nowTime, timestamp, afterTime, afterTimestamp} = getTimeAndTimestampAfterDay(14);
    const deleteWord = {
      timestamp,
      afterTimestamp,
      afterTime,
      word: targetWord,
      means: localWords.value.get(targetWord).means,
      time: nowTime,
    };

    localWords.value.delete(targetWord);
    wordArrUpdate();

    // 휴지통에 이미 존재하는 단어면 지운뒤 저장
    if (localTrashCan.value.has(targetWord)) {
      localTrashCan.value.delete(targetWord);
    }

    localTrashCan.value.set(targetWord, deleteWord);
  }

  // 화면간 단어 <-> 휴지통 교체
  function contentChange() {
    screenTransition.value = screenTransition.value === 0 ? 1 : 0;
  }

  // word detail
  function wordDetail(targetWord) {
    const { word, means, time } = localWords.value.get(targetWord);
    const detailWord = { word, means: means.split(','), time };
    return detailWord;
  }

  // trashCan word detail
  function trashCanWordDetail(targetWord) {
    const { word, means, afterTime, time } =
      localTrashCan.value.get(targetWord);
    const detailTrashCanWord = {
      means: means.split(','),
      word,
      time,
      afterTime,
    };
    return detailTrashCanWord;
  }

  // trashCan word kill
  function trashCanWordKill(targetWord) {
    localTrashCan.value.delete(targetWord);
  }

  // trashCan word restore
  function trashCanWordRestore(targetWord) {
    const { word, means } = localTrashCan.value.get(targetWord);
    wordAdd(word, means);
    trashCanWordKill(word);
  }

  // recent words update
  function recentWordUpdate(searchWord) {
    // 중복 확인
    const repeatCheckIndex = localRecentSearchWords.value.findIndex(
      (word) => word === searchWord,
    );
    const recentWords =
      repeatCheckIndex !== -1
        ? [
            ...localRecentSearchWords.value.slice(0, repeatCheckIndex),
            ...localRecentSearchWords.value.slice(repeatCheckIndex + 1),
          ]
        : [...localRecentSearchWords.value];
    recentWords.length >= 5 ? recentWords.pop() : '';

    localRecentSearchWords.value = [searchWord, ...recentWords];
  }

  // recent words delete
  function recentWordDelete(index) {
    const recentWords = [
      ...localRecentSearchWords.value.slice(0, index),
      ...localRecentSearchWords.value.slice(index + 1),
    ];
    localRecentSearchWords.value = [...recentWords];
  }

  return {
    wordArr,
    localTrashCan,
    localRecentSearchWords,
    screenTransition,
    setWordDic,
    wordAdd,
    wordCheck,
    wordDelete,
    contentChange,
    wordDetail,
    trashCanWordDetail,
    trashCanWordKill,
    trashCanWordRestore,
    recentWordUpdate,
    recentWordDelete,
  };
});
