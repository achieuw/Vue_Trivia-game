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
    category: categoryID.value,
  });

  if (data === null) {
    displayError.value = "error";
  } else {
    emit("onClickSuccess");
  }
};
</script>

<template>
  <div
    id="form-container"
    ref="form-container"
    class="w-96 h-96 bg-[#FCAA67f9] px-8 py-8 mt-20 shadow-xl
    ml-6"
  >

  <div class="absolute inherit-dim bg-[#9123f8] -z-40 shadow-xl">
  </div>
  <div class="absolute inherit-dim bg-[#a195a3] -z-30 -m-2 shadow-md">
  </div>
  <div class="absolute inherit-dim bg-[#cdbccf] -z-20 -m-4 shadow-md">
  </div>
  <div class="absolute inherit-dim bg-[#E9D6EC] -z-10 -m-6 shadow-md">
  </div>
    
    <form class="flex flex-col font-semibold">
      <label for="username">Username: </label>
      <input
        id="username"
        class="mb-4 border-b-1 outline-none grow-on-focus w-9/12"
        type="text"
        placeholder="Enter username.."
        v-model="username"
      />

      <label for="difficulty">Difficulty: </label>
      <select class="mb-4 w-36 text-black" id="difficulty grow-on-focus" v-model="difficulty">
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
        class="mb-4 border-b-1 w-36 outline-none text-black grow-on-focus"
        type="number"
        placeholder="Enter number.."
        v-model="amountOfQuestions"
      />

      <div class="mb-4">
        <CategoryList @onCategorySelect="setCategoryValue" />
      </div>
    </form>

    <ViewButton
      class="float-right text-black grow-on-focus"
      buttonText="Start Game"
      @onClick="onClickStart"
    />

    <p>{{ displayError }}</p>
  </div>
</template>

<style>
.border-b-1 {
  border-bottom: 1px solid gray;
}
.border-b-1:focus {
  border-bottom: 1px solid #34d399;
}
.grow-on-focus{
  transition: 0.3s
}
.grow-on-focus:focus, .grow-on-focus:focus option {
  padding: 6px;
  width: 80%;
  transition: 0.3s;
  background-color: #fcaa67;
}
.inherit-dim{
  width: inherit;
  height: inherit;
}
</style>
