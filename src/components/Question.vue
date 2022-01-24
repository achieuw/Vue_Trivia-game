<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import QuestionItem from './QuestionItem.vue';

// decode(str) = {
//     let textArea = document.createElement('textarea');
//     textArea.innerHTML = str;
//     return textArea.value;
// }

const questionNumber = ref(1)
const store = useStore()

const questions = computed(() => store.state.questions)

const increment = () => {
    if(questionNumber.value < questions.value.length) {
        questionNumber.value++
    }
}

</script>

<template>
    <div v-for="(question,index) in questions" :key="index">
        <QuestionItem v-if="questionNumber === index + 1" :question="question" :questionNumber="index + 1" @onClickNextQuestion="increment" />
    </div>
</template>