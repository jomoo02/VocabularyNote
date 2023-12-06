<script setup>
import { Icon } from '@iconify/vue';
import { useMainStore } from '@/stores/Main';
import { useModalStore } from '@/stores/modal';
import { ref } from 'vue';
import WordInput from './WordInput.vue';
import ModalCaseNomal from './ModalCaseNomal.vue';
import ModalCaseNotExist from './ModalCaseNotExist.vue';
import ModalCaseSimilar from './ModalCaseSimilar.vue';

const mainStore = useMainStore();
const modalStore = useModalStore();
const child_input = ref(null);

function contentChangeClick() {
  mainStore.contentChange();
  child_input.value.childComponent();
}
</script>

<template>
  <div
    class="fixed top-0 z-20 flex items-center w-full h-16 min-h-16 max-h-16 justify-between py-2 px-2 xs:px-6 sm:px-10 md:px-24 lg:px-48 2xl:px-80 bg-[#2E4559]"
  >
    <!-- logo -->
    <div class="text-2xl md:text-4xl font-bold text-white">voca</div>
    <!-- input -->
    <div class="relative w-3/5 md:w-1/2">
      <WordInput ref="child_input" />
    </div>
    <!-- btn -->
    <button @click="contentChangeClick">
      <Icon
        icon="ph:trash"
        width="34"
        height="34"
        color="#e4e4e7"
        :class="mainStore.screenTransition === 0 ? 'block' : 'hidden'"
      />
      <Icon
        icon="ph:notepad"
        width="34"
        height="36"
        color="#e4e4e7"
        :class="mainStore.screenTransition === 1 ? 'block' : 'hidden'"
      />
    </button>
    <!-- modal -->
    <Teleport to="body">
      <Transition name="slide-fade">
        <ModalCaseNomal v-if="modalStore.inputModal" />
      </Transition>
      <Transition name="slide-fade">
        <ModalCaseSimilar v-if="modalStore.inputSimilarModal" />
      </Transition>
      <Transition name="slide-fade">
        <ModalCaseNotExist v-if="modalStore.inputNotExistModal" />
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
