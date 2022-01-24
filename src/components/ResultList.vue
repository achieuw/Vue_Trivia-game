<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ResultItem from './ResultItem.vue';

const store = useStore();

const questions = computed(() => store.state.questions)

onMounted({
    
})

</script>

<template>
    <h1>ResultList</h1>
    <div>
        <ResultItem v-for="(question, index) in questions" :key="index" :question="question" :index="index"/>
    </div>
</template>