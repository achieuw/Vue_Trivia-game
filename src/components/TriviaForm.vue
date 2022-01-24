<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import ViewButton from "./ViewButton.vue";
import CategoryList from "./CategoryList.vue";
import { apiGetQuestions } from "../api/questions";

const store = useStore();
const emit = defineEmits(["onClickSuccess"]);
const username = ref("");
const difficulty = ref("");
const amountOfQuestions = ref(10);
const categoryID = computed(() => store.state.categoryID);

const displayError = ref("");

onMounted(async () => {
  await store.dispatch("fetchCategories");
});

const setCategoryValue = (value) => {
  categoryID = value;
};
const onClickStart = async () => {
  const data = await store.dispatch("fetchUser", {
    username,
  });

  await store.dispatch("fetchQuestions", {
    amount: amountOfQuestions.value,
    difficulty: difficulty.value,
    category: categoryID.value
  })

  if (data === null) {
    displayError.value = "error";
  } else {
    emit("onClickSuccess");
  }
};
</script>

<template>
  <form class="flex flex-col max-w-xs ml-6">
    <label for="username">Username: </label>
    <input
      id="username"
      class="mb-4 border-b-1 outline-none"
      type="text"
      placeholder="Enter username.."
      v-model="username"
    />

    <label for="difficulty">Difficulty: </label>
    <select class="mb-4 w-36" id="difficulty" v-model="difficulty">
      <option value="" selected disabled hidden>Any</option>
      <option value="any">Any</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <p>{{ difficulty }}</p>

    <label for="amount-of-questions">Number of Questions: </label>
    <input
      id="amount-of-questions"
      class="mb-4 border-b-1 w-36 outline-none"
      type="number"
      placeholder="Enter number.."
      v-model="amountOfQuestions"
    />
    
    <div class="mb-4">
      <CategoryList @onCategorySelect="setCategoryValue" />
    </div>
  </form>
  <ViewButton
    class="ml-6 bg-emerald-400 w-28 rounded-md p-2 hover:bg-emerald-500"
    buttonText="Start Game"
    @onClick="onClickStart"
  />

  <p>{{ displayError }}</p>
</template>

<style>
.border-b-1 {
  border-bottom: 1px solid gray;
}
.border-b-1:focus {
  border-bottom: 1px solid rgb(30, 172, 30);
}
</style>
