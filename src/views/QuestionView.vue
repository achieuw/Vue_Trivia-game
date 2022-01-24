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
  <h1>Question View</h1>
  <Question />
  <ViewButton
        buttonText="Go to result" 
        @onClick="onClickView"/>
</template>
