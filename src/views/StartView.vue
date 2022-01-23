<script setup>
import { useRouter } from 'vue-router';
import TriviaForm from '../components/TriviaForm.vue';

const router = useRouter()

const handleStartGame = () => {
  router.push('Questions')
}
</script>

<template>
<h1 class="text-4xl text-center p-4">Trivia Game Start View</h1>
<TriviaForm @onClickStart="handleStartGame"/>
</template>