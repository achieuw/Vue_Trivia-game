<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ResultItem from './ResultItem.vue';

const store = useStore();

const questions = computed(() => store.state.questions)

onMounted(async () => {
    await store.dispatch("fetchQuestions", {
        amount: 10,
        difficulty: "any",
        category: "0"
    })
})

</script>

<template>
    <h1 class="text-center">ResultList</h1>
    <div class="flex flex-col gap-4 items-center">
        <ResultItem v-for="(question, index) in questions" :key="index" :question="question" :index="index"/>
    </div>
</template>