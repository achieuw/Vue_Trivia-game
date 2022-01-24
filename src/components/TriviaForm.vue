<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { apiUserDataGet } from '../api/users';
import ViewButton from './ViewButton.vue';

const store = useStore()
const emit = defineEmits(['onClickSuccess']);
const username = ref("")

//const categories = computer(() => store.getters.categories)

const displayError = ref("")

const onClickStart = async () => {
   const data = await store.dispatch("fetchUser", {
     username
  })

  if (data === null) {
    displayError.value = "error"
  } else {
   emit('onClickSuccess')
  }
}
</script>

<template>
    <form class="flex flex-col max-w-xs ml-6">

      <label for="username">Username: </label>
      <input class="mb-4 border-b-1 outline-none" type="text" placeholder="Enter username.." v-model="username">

      <label for="difficulty">Difficulty: </label>
      <select class="mb-4 w-24" id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label for="username">Number of Questions: </label>
      <input class="mb-4 border-b-1 w-36 outline-none" type="number" placeholder="Enter number..">

      <label for="categories">Category: </label>
      <select class="mb-4" id="categories">
        <option value="easy">All categories</option>
      </select>

      
    </form>
    <ViewButton class="bg-emerald-400 w-28 rounded-md p-2 hover:bg-emerald-500" 
      buttonText="Start Game" 
      @onClick="onClickStart"/>

    <p> {{displayError}} </p>
</template>

<style>
.border-b-1{
  border-bottom: 1px solid gray
}
.border-b-1:focus{
  border-bottom: 1px solid rgb(30, 172, 30);
}
</style>