<script setup>
import { useRouter } from 'vue-router';
import ViewButton from '../components/ViewButton.vue'
import Question from '../components/Question.vue';

const router = useRouter()



const onClickView = () => {
  router.push('Result')
}
</script>

<template>
  <h1>Question View</h1>
  <Question :questionNumber="1" />
  <ViewButton class="bg-emerald-400 w-28 rounded-md p-2 hover:bg-emerald-500" 
        buttonText="Go to result" 
        @onClick="onClickView"/>
</template>
