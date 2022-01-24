<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import QuestionItem from './QuestionItem.vue';
import ViewButton from './ViewButton.vue';

const emit = defineEmits(['toResult'])

const questionNumber = ref(1)
const store = useStore()

const questions = computed(() => store.state.questions)

const increment = () => {
    if(questionNumber.value < questions.value.length) {
        questionNumber.value++
    }
}

//fills answers with empty strings if 
const onClickToResult = () => {
    if(questionNumber.value < questions.value.length) {
        for (let i = questionNumber.value; i <= questions.value.length; i++) {
            store.commit('addAnswer', '')
        }
    }
    emit('toResult')
}

</script>

<template>
    <div class="flex justify-center"
    v-for="(question,index) in questions">
        <QuestionItem v-if="questionNumber === index + 1" :key="index" :question="question" :questionNumber="index + 1" @onClickNextQuestion="increment" />
    </div>
    <ViewButton class="absolute right-1/4 bottom-1/4"
        buttonText="Go to result" 
        @onClick="onClickToResult"/>
</template>