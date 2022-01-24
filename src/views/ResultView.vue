<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'
import ResultList from '../components/ResultList.vue';

const router = useRouter()

const onClickStartView = () => {
  router.push('/')
}
const onClickQuestionView = () => {
  router.push('/Questions')
}
</script>

<template>
<h1>Result View</h1>
<ResultList />
<ViewButton 
      buttonText="Go to start" 
      @onClick="onClickStartView"/>
<ViewButton 
      buttonText="Play again" 
      @onClick="onClickQuestionView"/>
</template>