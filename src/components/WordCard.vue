<script setup>
import { Icon } from '@iconify/vue'
import { useStoreStore } from '../stores/store'
import { ref, toRef, onUpdated } from 'vue'

const props = defineProps({
    word: String,
    means: String,
    check: Boolean
})
const emits = defineEmits(['detail']);



const store = useStoreStore();

const word = toRef(props,'word');
const means = toRef(props,'means');
const check = ref(props.check);


function transmit() {
    emits('detail', word.value);
}

</script>

<template>
    <div class="flex flex-col" >
        <!-- word -->
        <div class="xl:w-2/12 flex gap-x-1">
            <!-- check Icon -->
            <button>
                <Icon v-if="check" class="flex items-center"  @click="check=!check, store.wordCheck(word,check)" icon="carbon:checkbox" width="37" height="37"></Icon>
                <Icon v-else class="flex items-center" @click="check=!check, store.wordCheck(word,check)" icon="carbon:checkbox-checked" width="37" height="37"></Icon>
            </button>
            <!-- word -->
            <span class=" cursor-pointer font-bold  text-3xl h-[64px] leading-[64px] hover:text-4xl hover:leading-[64px]"
            :class="check === false ? 'wordcheck_active':''" @click="transmit" >{{ word }}</span>
        </div>
        <!-- mean -->
        <div :class="check === false ? 'wordcheck_active':''">
            <div v-for="mean in means.split(',')" key="mean" class=" h-[32px] font-medium ml-1">
            {{ mean }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.wordcheck_active {
    text-decoration-line: line-through;
    text-decoration-thickness: 2px;
    opacity: 0.6;
}
</style>