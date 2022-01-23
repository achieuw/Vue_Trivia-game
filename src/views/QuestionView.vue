<script setup>
import Question from '../components/Question.vue';
import { apiGetQuestions } from '../api/questions';
import { onMounted } from 'vue';

onMounted(async () => {
    const { error, response } = await apiGetQuestions(10);
})

</script>

<template>
    <h1>Questions</h1>
    <!-- <Question v-for="(question, index) in response" :key="index" :questionNumber="index"  /> -->
</template>

<style>
</style>