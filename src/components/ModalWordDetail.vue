<script setup>
import { useStoreStore } from '@/stores/store';
import { Icon } from '@iconify/vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { onKeyStroke } from '@vueuse/core'

const store = useStoreStore();
const props = defineProps({
    word: String,
    means: Array,
    time: String,

})
onKeyStroke(['Escape'], (e) => {
    if (store.detailModal ===  true) {
        store.detailModal = false;
    }
});

onMounted(() => {
    // document.body.classList.add('fixed',`top-[-${topPx}px]`, 'overflow-y-scroll', 'w-full');
    document.body.classList.add('overflow-y-hidden');

})
onUnmounted(() => {
    // document.body.classList.remove('fixed',`top-[-${topPx}px]`, 'overflow-y-scroll', 'w-full');
    document.body.classList.remove('overflow-y-hidden');


})
</script>

<template>
    <div class="fixed z-[999] inset-0 w-full  bg-[#656C85CC]">
        <div class="relative mx-10  mt-[80px] flex justify-center">
            <div class="relative bg-white rounded-md py-6 px-6 w-2/3 md:w-1/2 h-[380px] border border-slate-400  overflow-auto">
                <!-- 나가기 -->
                <div class="flex justify-end cursor-pointer"><Icon icon="ion:close" @click="store.detailModal = false" width="30" heihgt="30"></Icon></div>
                <!-- word -->
                <div class="flex my-5 pb-4 items-center">
                    <div class="text-4xl font-bold">{{props.word}}</div>
                </div>
                <!-- mean -->
                <div v-for="mean in props.means" key="mean" class="font-semibold text-lg">
                    {{ mean }}
                </div>
          
                <!-- 추가, 취소 버튼  -->
                <div class=" absolute bottom-0 right-0 p-6 ">
                    <div class="text-sm flex justify-end my-4 text-neutral-400">{{ props.time }}</div>
                    <div class="flex gap-x-4">
                        <button @click="store.detailModal = false" class="py-1 px-2.5 rounded-md text-white bg-neutral-400   hover:bg-neutral-500  font-semibold ">cancel</button>
                        <button @click="store.wordDelete(props.word)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-rose-400 hover:bg-rose-600">delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>