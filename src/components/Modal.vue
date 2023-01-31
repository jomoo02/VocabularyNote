<script setup>
import { useStoreStore } from '@/stores/store';
import { Icon } from '@iconify/vue';
import { onMounted, onUnmounted } from 'vue';
const store = useStoreStore();


onMounted(() => {
    document.body.classList.add('overflow-y-hidden');

})
onUnmounted(() => {
    document.body.classList.remove('overflow-y-hidden');
})
function modalExit() {
    store.inputModal = false;
    store.detailModal = false;
    store.trashCanWordModal = false;
    store.inputElseModal = false;
}
</script>

<template>
    <div class="fixed z-[999] inset-0 w-full h-full max-h-screen bg-[#656C85CC]" tabindex="0" >
        <div class="relative flex justify-center mx-10 mt-[80px]">
            <!-- w-2/3 md:w-1/2 -->
            <div class="relative py-6 px-6 w-[480px] h-[400px] bg-white rounded-md border border-slate-400 overflow-auto">
                <!-- 나가기 -->
                <div class="flex justify-end"><Icon icon="ion:close" @click="modalExit" width="30" heihgt="30"></Icon></div>
                <slot name="word"></slot>
                <slot name="means"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>