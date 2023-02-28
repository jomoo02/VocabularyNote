<script setup>
import { Icon } from '@iconify/vue';
import { useStoreStore } from '../stores/store';
import { ref } from 'vue';

const props = defineProps({
    word: String,
    means: String,
    check: Boolean,
    index: Number,
})
const emits = defineEmits(['detail']);
const store = useStoreStore();

const word = ref(props.word);
const means = ref(props.means);
const check = ref(props.check);
const index = ref(props.index);


function transmit() {
    emits('detail', word.value);
}

function checkBtnClick() {
    check.value = !check.value;
    store.wordCheck(word.value, check.value, index.value);
}

</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-x-1">
            <!-- check Icon -->
            <button>
                <Icon v-if="check" class="flex items-center" @click="checkBtnClick" icon="carbon:checkbox" width="37" height="37"></Icon>
                <Icon v-else class="flex items-center" @click="checkBtnClick" icon="carbon:checkbox-checked" width="37" height="37"></Icon>
            </button>
            <!-- word -->
            <span class="card_word" :class="check === false ? 'wordcheck_active':''" @click="transmit">{{ word }}</span>
        </div>
        <!-- mean -->
        <div :class="check === false ? 'wordcheck_active':''">
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