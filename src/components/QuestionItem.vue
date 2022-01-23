<script setup>

defineProps({
    question: {
        type: Object,
        required: true
    },
    questionNumber: Number
})

const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}

</script>

<template>
    <h1>Question #{{questionNumber}}</h1>
    <h2 >{{decode(question.question)}}</h2>

    <form action="">
        <!-- multiple answers -->
        <div v-if="question.type === 'multiple'">
            <div class="block">
                <input type="radio" :name="question.question" :id="question.correct_answer">
                <label :for="question.correct_answer">{{decode(question.correct_answer)}}</label>
            </div>
            <div class="block" v-for="answer in question.incorrect_answers">
                <input  type="radio" :name="question.question" :id="answer">
                <label :for="answer">{{decode(answer)}}</label>
            </div>
        </div>
    
        <!-- true / false -->
        <div v-else-if="question.type === 'boolean'">
            <input type="radio" :name="question.question" id="true">
            <label for="true">True</label>
            <input type="radio" :name="question.question" id="false">
            <label for="false">False</label>
        </div>
    </form>
</template>