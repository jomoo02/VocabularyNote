<script setup>
const props = defineProps({
    word: String,
    means: Array,
    time: String,
    afterTime: String,
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
       <div class="card_word" @click="trashCanWordDetail">
           {{ props.word }}
        </div>
        <!-- 삭제한 날 -->
        <div class="card_content">
            삭제한 날짜 : {{ props.time }} 
        </div>
        <!-- 휴지통에서 지워질 날 -->
        <div class="card_content">
            완전히 삭제될 날짜 : {{ props.afterTime }}
        </div>
    </div>
</template>