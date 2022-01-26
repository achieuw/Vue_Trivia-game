<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'
import ResultList from '../components/ResultList.vue';
import ResultScore from '../components/ResultScore.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';

const router = useRouter();
const store = useStore();

const displayError = ref('')

// reset score when play again or going to start
const resetScore = () => {
  store.commit("setScore", 0);
};

// go to start
const onClickStartView = () => {
  resetScore();
  router.push("/");
};

// handle play again
const onClickQuestionView = async () => {
  displayError.value = ""

  // fetch new questions with same parameters as last time
  const error = await store.dispatch('playAgain');

  // if we get an error, display it
  if(error) {
    displayError.value = error
  } else { // else reset score and go to question view
    resetScore()
    router.push('/Questions')
  }
}
</script>

<template>
<h1 class="text-center text-5xl">Result View</h1>
<ResultList />
<div class="fixed flex flex-col gap-2 justify-evenly top-1/3 right-0 bg-[#FCAA67f9] p-3 max-w-xs w-96 shadow-xl">
  <ResultScore />
  <div class="flex gap-2">
    <ViewButton 
          buttonText="Go to start" 
          @onClick="onClickStartView"/>
    <ViewButton 
          buttonText="Play again" 
          @onClick="onClickQuestionView"/>
  </div>
  <!-- error text -->
  <p class="text-red-700 text-center">{{ displayError }}</p>
</div>
</template>
