<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Check if new high score
const score = computed(() => store.state.score);
const highScore = computed(() => store.state.highScore);
const userID = computed(() => store.state.id);

// Checks if score is greater than highscore and updates it in state and on API
onMounted(async () => {
  if (score.value > highScore.value) {
    await store.dispatch('updateUserScore', {id: userID.value, highScore: score.value})
  }
});
</script>

<template>
  <div class="flex flex-col text-2xl">
    <h1>HighScore: {{ highScore }}</h1>
    <h1>Score: {{ score }}</h1>
  </div>
</template>
