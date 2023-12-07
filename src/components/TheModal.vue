<script setup>
import { Icon } from '@iconify/vue';
import { onKeyStroke } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';

const emits = defineEmits(['clickCloseIcon']);

onMounted(() => {
  document.body.classList.add('overflow-y-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-y-hidden');
});

function clickCloseIcon() {
  emits('clickCloseIcon');
}

onKeyStroke(['Escape'], () => {
  clickCloseIcon();
});
</script>

<template>
  <div class="fixed z-[999] inset-0 w-full h-full bg-[#656C85CC]" tabindex="0">
    <div class="relative flex justify-center mx-2 xs:mx-9 sm:mx-10 mt-[80px]">
      <div
        class="relative py-6 px-6 w-[480px] h-[400px] bg-white rounded-md border border-slate-400 overflow-auto"
      >
        <div class="flex justify-end">
          <button @click="clickCloseIcon">
            <Icon icon="ion:close" width="30" heihgt="30" />
          </button>
        </div>
        <div class="modal_word">
          <slot name="word" />
        </div>
        <slot name="means" />
        <div class="modal_footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
