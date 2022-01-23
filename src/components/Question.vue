<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';

defineProps({
    questionNumber: {
        type: Number,
        required: true
    }
})

// decode(str) = {
//     let textArea = document.createElement('textarea');
//     textArea.innerHTML = str;
//     return textArea.value;
// }

const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}

const store = useStore()

const questions = computed(() => store.getters.getQuestions)

</script>

<template>
    <h1>Hello Question {{questionNumber}}</h1>
    <h2 v-for="(question, index) in questions" :key="index" v-html="question.question"></h2>
</template>