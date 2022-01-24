<script setup>import { computed } from 'vue';
import { useStore } from 'vuex';


defineProps({
    question: Object,
    index: Number
})

const store = useStore();

// for testing
for (let i = 0; i < 10; i++) {
    store.commit("addAnswer", {
        answer: "",
        index: i
    })
}

const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}
</script>

<template>
    <h2>ResultItem</h2>
    <h2> {{ decode(question.question) }} </h2>
    <div class="flex">
        <!-- user answer -->
        <div>
            <p>You answered</p>
            <p>{{ decode(question.answer) }}</p>
        </div>

        <!-- correct answer -->
        <div>
            <p>Correct answer</p>
            <p>{{ decode(question.correct_answer) }}</p>
        </div>
    </div>
</template>