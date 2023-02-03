<script setup>
import { Icon } from '@iconify/vue';
import { onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../stores/modal';

const modalStore = useModalStore();

onMounted(() => {
    document.body.classList.add('overflow-y-hidden');

})
onUnmounted(() => {
    document.body.classList.remove('overflow-y-hidden');
})
</script>

<template>
    <div class="fixed z-[999] inset-0 w-full h-full max-h-screen bg-[#656C85CC]" tabindex="0" >
        <div class="relative flex justify-center mx-2 xs:mx-9 sm:mx-10 mt-[80px]">
            <!-- w-2/3 md:w-1/2 -->
            <div class="relative py-6 px-6 w-[480px] h-[400px] bg-white rounded-md border border-slate-400 overflow-auto">
                <!-- 나가기 -->
                <div class="flex justify-end"><Icon icon="ion:close" @click="modalStore.modalExit" width="30" heihgt="30"></Icon></div>
            
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