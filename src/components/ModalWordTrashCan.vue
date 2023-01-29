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
    afterTime: String,
    index: Number


})
onKeyStroke(['Escape'], (e) => {
    if (store.trashCanWordModal ===  true) {
        store.trashCanWordModal = false;
    }
});

onMounted(() => {
    document.body.classList.add('overflow-y-hidden');

})
onUnmounted(() => {
    document.body.classList.remove('overflow-y-hidden');


})
</script>

<template>
    <div class="fixed z-[999] inset-0 w-full  bg-[#656C85CC]">
        <div class="relative  mx-4 sm:mx-10  mt-[80px] flex justify-center">
            <div class="relative bg-white rounded-md py-6 px-6 w-full md:w-1/2 h-[380px] border border-slate-400  overflow-auto">
                <!-- 나가기 -->
                <div class="flex justify-end cursor-pointer"><Icon icon="ion:close" @click="store.trashCanWordModal = false" width="30" heihgt="30"></Icon></div>
                <!-- word -->
                <div class="flex my-1 sm:my-5 pb-4 items-center">
                    <div class="text-4xl font-bold">{{props.word}}</div>
                </div>
                <!-- mean -->
                <div v-for="mean in props.means" key="mean" class="font-semibold text-lg">
                    {{ mean }}
                </div>

                <!-- 복원, 삭제 버튼  -->
                <div class=" absolute bottom-0 right-0 p-6 ">
                    <div class="text-sm  my-4 text-neutral-400">
                        <div>삭제한 날짜: {{ props.time }}</div>
                        <div>삭제될 날짜: {{ props.afterTime }}</div>
                    </div>
                    <div class="flex gap-x-4 justify-end">
                        <button @click="store.trashCanWordRestore(props.index)" class="py-1 px-2.5 rounded-md text-white bg-neutral-400   hover:bg-neutral-500  font-semibold">restore</button>
                        <button @click="store.trashCanWordDelete(props.index)" class="py-1 px-2.5 rounded-md text-white font-semibold bg-rose-400 hover:bg-rose-600">delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>