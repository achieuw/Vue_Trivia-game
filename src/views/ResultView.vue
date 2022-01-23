<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'

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
<ViewButton class="bg-emerald-400 w-28 rounded-md p-2 hover:bg-emerald-500" 
      buttonText="Go to start" 
      @onClick="onClickStartView"/>
<ViewButton class="bg-emerald-400 w-28 rounded-md p-2 hover:bg-emerald-500" 
      buttonText="Play again" 
      @onClick="onClickQuestionView"/>
</template>