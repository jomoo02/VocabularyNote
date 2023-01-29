<script setup>
const props = defineProps({
    word: String,
    means: Array,
    time: String,
    timestamp: Number,
    afterTime: String,
    afterTimestamp: Number,
    index: Number
})
const emits = defineEmits(['trashCanWord']);

function trashCanWordDetail() {
    emits('trashCanWord', props.index);
}

</script>

<template>
    <div>
       <!-- word -->
       <div class="inline-block font-bold cursor-pointer text-3xl h-[64px] leading-[64px] hover:text-4xl hover:leading-[64px]" @click="trashCanWordDetail">
           {{ props.word }}
        </div>
        <!-- 삭제한 날 -->
        <div>
            삭제한 날짜 : {{ props.time }} 
        </div>
        <!-- 휴지통에서 지워질 날 -->
        <div>
            완전히 삭제될 날짜 : {{ props.afterTime }}
        </div>
    </div>
</template>