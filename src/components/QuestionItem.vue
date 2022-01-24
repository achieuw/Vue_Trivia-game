<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import ViewButton from './ViewButton.vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    questionNumber: Number
})

const emit = defineEmits(['onClickNextQuestion'])

const store = useStore()

const onClickNextQuestion = () => {
    store.commit('addAnswer', { 
        answer: selectedAnswer.value,
        index: (props.questionNumber - 1)
    });
    emit('onClickNextQuestion')
}

const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}

const selectedAnswer = ref('');
//put all answers in answers array
const answers = ref([...props.question.incorrect_answers])
//insert value at random index
answers.value.splice(Math.floor(Math.random()*(answers.value.length + 1)), 0, props.question.correct_answer)

</script>

<template>
    <div class="border-2 border-emerald-400 flex flex-col items-center justify-end 
    min-w-fit rounded px-5 shadow-lg shadow-emerald-900 gap-4 relative">
        <h1 class="text-2xl text-center">Question #{{questionNumber}}</h1>
        <h2 class="text-xl max-w-xl text-center">{{decode(question.question)}}</h2>
    
        <!-- multiple answers -->
        <div v-if="question.type === 'multiple'">
            <div class="block hover:bg-slate-400 rounded p-1" v-for="answer in answers">
                <input type="radio" :name="question.question" :id="answer" :value="answer" v-model="selectedAnswer">
                <label class="mx-1" :for="answer">{{decode(answer)}}</label>
            </div>
        </div>
    
        <!-- true / false -->
        <div class="block" v-else-if="question.type === 'boolean'">
            <div class="hover:bg-slate-400 rounded p-1">
                <input type="radio" :name="question.question" id="true" value="True" v-model="selectedAnswer">
                <label class="mx-1" for="true">True</label>
            </div>
            <div class="hover:bg-slate-400 rounded p-1">
                <input type="radio" :name="question.question" id="false" value="False" v-model="selectedAnswer">
                <label class="mx-1" for="false">False</label>
            </div>
        </div>
        <ViewButton class="self-end mb-2" buttonText="Next Question" @onClick="onClickNextQuestion"/>
    </div>
</template>