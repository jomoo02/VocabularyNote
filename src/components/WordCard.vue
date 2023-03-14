<script setup>
import { Icon } from '@iconify/vue';
import { useMainStore } from '../stores/Main';
import { ref } from 'vue';

const props = defineProps({
    word: String,
    means: String,
    check: Boolean,
    index: Number,
})
const emits = defineEmits(['wordDetail']);
const mainStore = useMainStore();

const word = ref(props.word);
const means = ref(props.means);
const check = ref(props.check);
const index = ref(props.index);


function transmit() {
    emits('wordDetail', word.value);
}

function checkBtnClick() {
    check.value = !check.value;
    mainStore.wordCheck(word.value, check.value, index.value);
}

</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-x-1">
            <!-- check Icon -->
            <button>
                <Icon v-if="check===false" class="flex items-center" @click="checkBtnClick" icon="carbon:checkbox" width="37" height="37"></Icon>
                <Icon v-else class="flex items-center" @click="checkBtnClick" icon="carbon:checkbox-checked" width="37" height="37"></Icon>
            </button>
            <!-- word -->
            <span class="card_word" :class="{ wordcheck_active: check }" @click="transmit">{{ word }}</span>
        </div>
        <!-- mean -->
        <div :class="{ wordcheck_active: check }">
            <li v-for="mean in means.split(',')" :key="mean" class="card_content">
                {{ mean }}
            </li>
        </div>
    </div>
</template>

<style scoped>
.wordcheck_active {
    @apply opacity-60 line-through decoration-2;
}
</style>