<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import { onMounted } from "vue";
import TriviaForm from "../components/TriviaForm.vue";

const store = useStore();
const router = useRouter();

onMounted(async () => {
  await store.dispatch("fetchSessionToken");
});

const handleStartGame = () => {
  router.push("Questions");
};
</script>

<template>
  <div class="flex max-w-screen-lg justify-center flex-col mx-auto">
  <h1 class="text-4xl text-center p-4 font-bold">Bestest Trivia Game</h1>
  <p class="mx-auto p-4 text-lg">Plug and play trivia game! Just enter what type of questions you want and we'll set you up</p>
  <TriviaForm @onClickSuccess="handleStartGame" />
  </div>
</template>

