<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ResultItem from './ResultItem.vue';

const store = useStore();

// get questions from store
const questions = computed(() => store.state.questions)

</script>

<template>
    <h1 class="text-center">ResultList</h1>
    <div class="flex flex-col gap-5 items-center">
        <!-- loop through questions and create result item -->
        <ResultItem v-for="(question, index) in questions" :key="question.question" :question="question" :index="index"/>
    </div>
</template>