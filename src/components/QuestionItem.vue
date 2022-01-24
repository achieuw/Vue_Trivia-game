<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import ViewButton from './ViewButton.vue';

defineProps({
    question: {
        type: Object,
        required: true
    },
    questionNumber: Number
})

const emit = defineEmits(['onClickNextQuestion'])

const store = useStore()

const onClickNextQuestion = () => {
    //add selectedAnswer to state
    store.commit('addAnswer', selectedAnswer.value)
    emit('onClickNextQuestion')
}

const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}

const selectedAnswer = ref('');

</script>

<template>
    <h1>Question #{{questionNumber}}</h1>
    <h2 >{{decode(question.question)}}</h2>

    <!-- multiple answers -->
    <div v-if="question.type === 'multiple'">
        <div class="block">
            <input type="radio" :name="question.question" :id="question.correct_answer" :value="question.correct_answer" v-model="selectedAnswer">
            <label :for="question.correct_answer">{{decode(question.correct_answer)}}</label>
        </div>
        <div class="block" v-for="answer in question.incorrect_answers">
            <input type="radio" :name="question.question" :id="answer" :value="answer" v-model="selectedAnswer">
            <label :for="answer">{{decode(answer)}}</label>
        </div>
    </div>

    <!-- true / false -->
    <div v-else-if="question.type === 'boolean'">
        <input type="radio" :name="question.question" id="true" value="True" v-model="selectedAnswer">
        <label for="true">True</label>
        <input type="radio" :name="question.question" id="false" value="False" v-model="selectedAnswer">
        <label for="false">False</label>
    </div>
    <ViewButton buttonText="Next Question" @onClick="onClickNextQuestion"/>
    <p>{{selectedAnswer}}</p>
</template>