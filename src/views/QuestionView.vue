<script setup>
import { useRouter } from 'vue-router';
import Question from '../components/Question.vue';


const router = useRouter()
//switch view
const onClickView = () => {
  router.push('Result')
}
</script>

<template>
  <div class="flex flex-col justify-evenly items-stretch">
    <h1 class="text-5xl text-center mt-5 mb-10">Question View</h1>
    <div class="mt-10">
      <Question @toResult="onClickView"/>
    </div>
  </div>
</template>
