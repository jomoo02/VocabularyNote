<script setup>
import { useTrashCanStore } from '../compositions/trashCanStore';
import TrashCanWordCard from './TrashCanWordCard.vue';

const trashCanStore = useTrashCanStore();
</script>

<template>
  <TrashCanWordCard
    v-for="wordObj in trashCanStore.localTraschCanWords.values()"
    class="mb-[32px]"
    :key="wordObj.word"
    :word="wordObj.word"
    :means="wordObj.means"
    :time-info="wordObj.timeInfo"
    :deletion-sheduled-time-info="wordObj.deletionSheduledTimeInfo"
  />
</template>
