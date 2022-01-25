<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'
import ResultList from '../components/ResultList.vue';
import ResultScore from '../components/ResultScore.vue';

const router = useRouter()

const onClickStartView = () => {
  router.push('/')
}
const onClickQuestionView = () => {
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