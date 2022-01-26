<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import QuestionItem from './QuestionItem.vue';

const emit = defineEmits(['toResult'])

const questionNumber = ref(1)
const store = useStore()

// fetch questions from store
const questions = computed(() => store.state.questions)

// go to next question, when all questions have been answered go to result
const nextQuestion = () => {
    if(questionNumber.value < questions.value.length) {
        questionNumber.value++
    } else {
        emit('toResult')
    }
}

</script>

<template>
    <!-- loop through all questions and create questionItem -->
    <div class="flex justify-center"
    v-for="(question,index) in questions">
        <QuestionItem v-if="questionNumber === index + 1" :key="question.question" :question="question" :questionNumber="index + 1" :questionAmount="questions.length" @onClickNextQuestion="nextQuestion" />
    </div>
</template>