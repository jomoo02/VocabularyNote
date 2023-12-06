<script setup>
import { useMainStore } from '../stores/Main';
import { useModalStore } from '../stores/Modal';
import { useDetailWordStore } from '../stores/DetailWord';
import WordCard from './WordCard.vue';
import WordTrashCan from './WordTrashCan.vue';
import ModalTrashCanWordDetail from './ModalTrashCanWordDetail.vue';
import ModalWordDetail from './ModalWordDetail.vue';

const mainStore = useMainStore();
const modalStore = useModalStore();
const detailStore = useDetailWordStore();
</script>

<template>
  <div class="md:ml-10 lg:ml-32 xl:ml-36 2xl:ml-36">
    <template v-if="mainStore.screenTransition === 0">
      <div class="grid md:grid-cols-2 md:gap-x-36">
        <div
          v-for="(word, index) in mainStore.wordArr"
          :key="word"
          class="mb-[32px]"
        >
          <WordCard
            :word="word.word"
            :means="word.means"
            :check="word.check"
            :index="index"
            @wordDetail="(targetWord) => detailStore.detailWordOpen(targetWord)"
          ></WordCard>
        </div>
      </div>
    </template>
    <template v-if="mainStore.screenTransition === 1">
      <div>
        <div
          v-for="word in mainStore.localTrashCan.values()"
          :key="word"
          class="mb-[32px]"
        >
          <WordTrashCan
            :word="word.word"
            :means="word.means.split(',')"
            :time="word.time"
            :afterTime="word.afterTime"
            @trashCanWordDetail="
              (targetWord) => detailStore.trashCanDetailWordOpen(targetWord)
            "
          ></WordTrashCan>
        </div>
      </div>
    </template>
    <Teleport to="body">
      <Transition name="slide-fade">
        <ModalWordDetail v-if="modalStore.detailModal" />
      </Transition>
      <Transition name="slide-fade">
        <ModalTrashCanWordDetail v-if="modalStore.trashCanWordModal" />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatex(-20px);
  opacity: 0;
}
</style>
