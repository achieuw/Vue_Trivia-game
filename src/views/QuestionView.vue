<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import ViewButton from '../components/ViewButton.vue'
import Question from '../components/Question.vue';


const router = useRouter()
const store = useStore();

onMounted(async () => {
  console.log("hej");
  await store.dispatch("fetchQuestions", {
    amount: 10,
    difficulty: "any",
    category: "0"
  })
})

const onClickView = () => {
  router.push('Result')
}
</script>

<template>
  <div class="flex flex-col justify-evenly items-stretch border h-full">
    <h1 class="text-5xl text-center mt-5 mb-10">Question View</h1>
    <div class="mt-10">
      <Question />
    </div>
    <ViewButton class="absolute right-1/4 bottom-1/4"
          buttonText="Go to result" 
          @onClick="onClickView"/>
  </div>
</template>
