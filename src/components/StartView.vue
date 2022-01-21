<script setup>
import TriviaForm from './TriviaForm.vue';

const handleStartGame = () => {
  console.log("start game")
}
</script>

<template>
<h1>Trivia Game</h1>
<TriviaForm @onClick="handleStartGame"/>
</template>