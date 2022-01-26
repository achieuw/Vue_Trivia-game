<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import ViewButton from "./ViewButton.vue";
import CategoryList from "./CategoryList.vue";
import { apiGetAmountOfQuestions } from "../api/categories";

const store = useStore();
const emit = defineEmits(["onClickSuccess"]);
const username = ref("");
const difficulty = ref("any");
const amountOfQuestions = ref(1);
const categoryID = computed(() => store.state.categoryID);
const sessionToken = computed(() => store.state.sessionToken);
const maxAmountOfQuestions = ref(50)
const displayError = ref("");

// Fetch categories for the category list
onMounted(async () => {
  await store.dispatch("fetchCategories");
});

// Get maximum questions available for difficulty/category and set amount of questions
const getMaxAmountOfQuestions = async () => {
  const [error, maxAmount] = await apiGetAmountOfQuestions(difficulty.value)
  if (error) {
    return;
  }
  maxAmountOfQuestions.value = maxAmount
  if(amountOfQuestions.value > maxAmountOfQuestions.value) {
    amountOfQuestions.value = maxAmountOfQuestions.value
  }
}

// Update amount of questions value in state and set max amount of questions
const setQuestionAmount = async () => {
  store.commit("setQuestionAmount", amountOfQuestions.value)
  getMaxAmountOfQuestions()
}

// Update difficulty value in state and set max amount of questions
const setDifficulty = () => {
  store.commit("setQuestionDifficulty", difficulty.value)
  getMaxAmountOfQuestions()
}

// Update max amount of questions 
const setCategoryValue = () => {
  getMaxAmountOfQuestions()
};

// Fetch questions on game start 
const onClickStart = async () => {
  if (validUserInput(username.value)) {
    await store.dispatch("fetchUser", {
      username,
    });

    const error = await store.dispatch("fetchQuestions", {
      amount: amountOfQuestions.value,
      difficulty: difficulty.value,
      category: categoryID.value,
      sessionToken: sessionToken.value
    });
      if(error){
        displayError.value = error
      } else {
        emit("onClickSuccess");
      }
  } else {
    return null;
  }
};

// Check for valid user input (currently all symbols allowed)
const validUserInput = (name) => {
  if (name.length < 3) {
    displayError.value = "Username must contain at least 3 characters";
    return false;
  } else {
    displayError.value = "";
    return true;
  }
};
</script>

<template>
  <div
    id="form-container"
    ref="form-container"
    class="w-96 h-96 bg-[#FCAA67f9] px-8 py-8 mt-20 shadow-xl ml-6"
  >
    <div class="absolute inherit-dim bg-[#9123f8] -z-40 shadow-xl"></div>
    <div class="absolute inherit-dim bg-[#a195a3] -z-30 -m-2 shadow-md"></div>
    <div class="absolute inherit-dim bg-[#cdbccf] -z-20 -m-4 shadow-md"></div>
    <div class="absolute inherit-dim bg-[#E9D6EC] -z-10 -m-6 shadow-md"></div>

    <!-- Form Component -->
    <form class="flex flex-col font-semibold">
      <label for="username">Username: </label>
      <input
        id="username"
        class="mb-4 border-b-1 outline-none grow-on-focus w-9/12"
        type="text"
        placeholder="Enter username.."
        v-model="username"
        autocomplete="off"
      />

      <label for="difficulty">Difficulty: </label>
      <select
        class="mb-4 w-36 text-black grow-on-focus"
        id="difficulty"
        v-model="difficulty"
        @change="setDifficulty"
      >
        <!-- <option value="" selected disabled hidden>Any</option> -->
        <option value="any">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label for="amount-of-questions">Number of Questions: </label>
      <input
        id="amount-of-questions"
        class="mb-4 border-b-1 w-36 outline-none text-black grow-on-focus"
        type="number"
        min="1"
        :max="maxAmountOfQuestions"
        placeholder="Enter number.."
        v-model="amountOfQuestions"
        @change="setQuestionAmount"
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
    <!-- Error text for failed api requests/validation -->
    <p class="text-red-700">{{ displayError }}</p>
  </div>
</template>

<style scoped>
.border-b-1 {
  border-bottom: 1px solid gray;
}
.border-b-1:focus {
  border-bottom: 1px solid #34d399;
}
.grow-on-focus {
  transition: 0.3s;
}
.grow-on-focus:focus, .grow-on-focus:focus option {
  padding: 6px;
  width: 80%;
  transition: 0.3s;
  background-color: #fcaa67;
}
.inherit-dim {
  width: inherit;
  height: inherit;
}
</style>
