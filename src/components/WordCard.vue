<script setup>
import { useStoreStore } from '../stores/store';
const props = defineProps({
    word: String,
    means: Array,
    time: String,
    check: Boolean,
})
const store = useStoreStore();

function wordDetail() {
    store.wordDetail({word: props.word, means: [...props.means], time: props.time, check: props.check});
}   
</script>

<template>
    <div class="flex flex-col" >
        <!-- word -->
        <div class="xl:w-2/12" 
        :class="props.check === false ? 'wordcheck_active':''">
           <span class="cursor-pointer font-bold  text-3xl h-[64px] leading-[64px] hover:text-4xl hover:leading-[64px]"  @click="wordDetail">{{ props.word }}</span>
        </div>
        <!-- mean -->
        <div :class="props.check === false ? 'wordcheck_active':''">
            <div v-for="mean in props.means" key="mean" class=" h-[32px] font-medium ml-1">
            {{ mean }}
        </div>
        </div>
        <!--  -->
    </div>
</template>

<style scoped>
.wordcheck_active {
    text-decoration-line: line-through;
    text-decoration-thickness: 2px;
	/* color: rgb(63 63 70); */
    opacity: 0.7;

}
</style>