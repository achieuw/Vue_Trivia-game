<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'
import ResultList from '../components/ResultList.vue';
import ResultScore from '../components/ResultScore.vue';
import { useStore } from 'vuex';
import { apiUserDataPatch } from '../api/users';
import { computed } from 'vue';

const router = useRouter()
const store = useStore()

const questionAmount = computed(() => store.state.questionAmount)
const difficulty = computed(() => store.state.questionDifficulty)
const categoryID = computed(() => store.state.categoryID)
const sessionToken = computed(() => store.state.sessionToken)

const resetScore = () => {
  store.commit('setScore', 0)
}
const onClickStartView = () => {
  resetScore()
  router.push('/')
}
const onClickQuestionView = () => {
  resetScore()
  store.dispatch("fetchQuestions", {
    amount: questionAmount.value,
    difficulty: difficulty.value,
    category: categoryID.value,
    sessionToken: sessionToken.value
  })
  router.push('/Questions')
}
</script>

<template>
<h1 class="text-center text-5xl">Result View</h1>
<ResultList />
<div class="fixed flex flex-col gap-2 justify-evenly top-1/3 right-0 bg-[#FCAA67f9] p-3 w-72 h-40 shadow-xl">
  <ResultScore />
  <div class="flex gap-2">
    <ViewButton 
          buttonText="Go to start" 
          @onClick="onClickStartView"/>
    <ViewButton 
          buttonText="Play again" 
          @onClick="onClickQuestionView"/>
  </div>
</div>
</template>