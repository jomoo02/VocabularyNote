<script setup>
import { useStoreStore } from '@/stores/store';
import { Icon } from '@iconify/vue';
import { onKeyStroke,useFocus } from '@vueuse/core'
import { ref } from 'vue';
const store = useStoreStore();
const modalWrap = ref();
const props = defineProps({
    word: String,
    means: Array,
    time: String,
})
console.log(props.word, props.means);
onKeyStroke(['Escape'], (e) => {
    if (store.inputModal ===  true) {
        store.inputModal = false;
    }
});
onKeyStroke(['Enter'], (e) => {
    store.wordAdd();
});
// const { focosed } = useFocus(modalWrap, {initialValue: true})
</script>

<template>
    <div class="fixed z-[999] inset-0 max-h-screen w-full h-full bg-[#656C85CC]" tabindex="0" >
        <div class="relative mx-10  mt-[80px] flex justify-center">
            <div ref="modalWrap" class="relative  bg-white rounded-md py-6 px-6 w-2/3 md:w-1/2 h-[380px] border border-slate-400  overflow-auto">
                <!-- 나가기 -->
                <div class="flex justify-end"><Icon icon="ion:close" @click="store.inputModal = false" width="30" heihgt="30"></Icon></div>
                <!-- word -->
                <div class="text-4xl my-5 pb-4 font-bold">{{props.word}}</div>
                <!-- mean -->
                <div v-for="mean in props.means" key="mean" class="font-semibold text-lg">
                    {{ mean }}
                </div>
                <!-- 추가, 취소 버튼  -->
                <div class="flex absolute bottom-0 right-0 p-6 gap-x-4">
                    <button @click="store.inputModal = false" class="py-1 px-2.5 rounded-md text-white font-semibold bg-neutral-400 hover:bg-neutral-500 ">cancel</button>
                    <button @click="store.wordAdd" class="py-1 px-2.5 rounded-md text-white font-semibold bg-emerald-400  hover:bg-emerald-600">add</button>
                </div>
            </div>
        </div>
    </div>
</template>