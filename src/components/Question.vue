<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import QuestionItem from './QuestionItem.vue';

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
    <div class="flex justify-center"
    v-for="(question,index) in questions">
        <QuestionItem v-if="questionNumber === index + 1" :key="index" :question="question" :questionNumber="index + 1" @onClickNextQuestion="increment" />
    </div>
</template>