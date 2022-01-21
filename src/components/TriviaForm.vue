<script setup>
import { ref } from 'vue'

const emits = defineEmits(['onClick']);

const onClickStart = () => {
  emits('onClick')
  // POST/GET user data
  // GET trivia data
}
</script>

<template>
  <form class="flex-col w-50">
    <label for="username">Username: </label>
    <input type="text" placeholder="Enter username..">
    <label for="username">Difficulty: </label>
    <input type="text" placeholder="Enter difficulty..">
    <label for="username">Number of Questions: </label>
    <input type="text" placeholder="Enter number..">
    <label for="username">Category: </label>
    <input type="text" placeholder="Enter category..">

    <button class="start-btn" @click="onClickStart" type="button">Start Game</button>
  </form>
</template>

<style scoped>
.flex-col{
  display: flex;
  flex-direction: column;
}
.w-50{
  width: 50%;
}
form{
  margin: 4px;
}
input{
  padding: 4px;
  margin: 8px;
  border: none;
  border-bottom: 1px solid rgb(73, 73, 73);
  outline: none;
}
input:focus{
  border-bottom: 1px solid rgb(25, 184, 25);
}
.start-btn{
  width: 50%;
  margin: 6px auto;
  padding: 12px;
  background-color: rgb(121, 223, 197);
  border: none;
  border-radius: 12px;
}
.start-btn:hover{
  background-color: rgb(51, 233, 172);
  cursor: pointer;
}
</style>
