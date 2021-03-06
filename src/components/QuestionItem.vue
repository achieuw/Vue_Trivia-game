<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import ViewButton from './ViewButton.vue';

// props passed down from parent
const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    questionNumber: Number,
    questionAmount: Number
})

const emit = defineEmits(['onClickNextQuestion'])

const store = useStore()

const displayError = ref('')
const buttonText = ref('Next Question')

// change button text if on last question
if(props.questionNumber === props.questionAmount) {
    buttonText.value = 'Go to results'
}

// if no answer has been chosen, prompt user
// if answer has been chosen, add answer to question item and emit to go to next question
const onClickNextQuestion = () => {
    displayError.value = ""
    if(selectedAnswer.value !== ""){
        store.commit('addAnswer', { 
        answer: selectedAnswer.value,
        index: (props.questionNumber - 1)
        });
        emit('onClickNextQuestion')
    } else {
        displayError.value = "Please answer the question before proceeding"
    }
}

const selectedAnswer = ref('');
//put all incorrect_answers in answers array
const answers = ref([...props.question.incorrect_answers])
//insert correct answer at random index
answers.value.splice(Math.floor(Math.random()*(answers.value.length + 1)), 0, props.question.correct_answer)

</script>

<template>
    <div class="flex flex-col shadow-xl
     px-5 gap-4 bg-[#FCAA67] h-96 w-96">

    <!-- cascading squares styling -->
    <div class="absolute inherit-dim bg-[#E9D6EC] -z-10 my-2 -mx-3 shadow-md"></div>
    <div class="absolute inherit-dim bg-[#cdbccf] -z-20 my-4 -mx-1 shadow-md"></div>
    <div class="absolute inherit-dim bg-[#a195a3] -z-30 my-6 mx-1 shadow-md"></div>
    <div class="absolute inherit-dim bg-[#9123f8] -z-40 my-8 mx-3 shadow-xl"></div>

        <h1 class="text-2xl text-center">Question #{{questionNumber}}</h1>
        <!-- v-html to decode question -->
        <h2 class="text-xl max-w-xl text-center" v-html="question.question"></h2>
    
        <!-- multiple answers -->
        <div v-if="question.type === 'multiple'"
        class="text-center">
            <!-- loop through all answers and create element -->
            <div class="block hover:bg-emerald-300 rounded p-1" v-for="answer in answers">
                <input type="radio" :name="question.question" :id="answer" :value="answer" v-model="selectedAnswer">
                <label class="mx-1" :for="answer" v-html="answer"></label>
            </div>
        </div>
    
        <!-- true / false -->
        <div class="block text-center" v-else-if="question.type === 'boolean'">
            <div class="hover:bg-emerald-300 rounded p-1">
                <input type="radio" :name="question.question" id="true" value="True" v-model="selectedAnswer">
                <label class="mx-1" for="true">True</label>
            </div>
            <div class="hover:bg-emerald-300 rounded p-1">
                <input type="radio" :name="question.question" id="false" value="False" v-model="selectedAnswer">
                <label class="mx-1" for="false">False</label>
            </div>
        </div>
        <!-- next question/go to result button -->
        <ViewButton class="self-end mb-2 " :buttonText="buttonText" @onClick="onClickNextQuestion"/>
    </div>

    <!-- error text -->
    <div v-if="displayError !== ''" class="fixed right-0 bg-[#FCAA67] p-2 animate-bounce">
        <p class="text-red-700"> {{ displayError }} </p>
    </div>
</template>

<style scoped>
.inherit-dim {
  width: inherit;
  height: inherit;
}
</style>