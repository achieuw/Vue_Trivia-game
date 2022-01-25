import { createStore } from "vuex";
import { apiGetQuestions, apiGetSessionToken } from "./api/questions";
import { apiGetCategories } from "./api/categories";
import { apiUserDataGet, apiUserDataPatch, apiUserDataPost } from "./api/users";

export default createStore({
  state: {
    user: "",
    id: 0,
    highScore: 0,
    score: 0,
    questions: [],
    answers: [],
    categories: [],
    questionAmount: 10,
    questionDifficulty: "any",
    categoryID: 0,
    sessionToken: ""
  },
  getters: {
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setUserID: (state, id) => {
      state.id = id;
    },
    setHighScore: (state, highScore) => {
      state.highScore = highScore;
    },
    setQuestions: (state, questions) => {
      state.questions = questions;
    },
    addAnswer: (state, { answer, index }) => {
      if (answer === "") {
        answer = "N/A"
      }
      state.questions[index].answer = answer;
      if(state.questions[index].correct_answer === answer ){
        state.score++;
      }
    },
    setQuestionAmount: (state, amount) => {
      state.questionAmount = amount
    },
    setQuestionDifficulty: (state, difficulty) => {
      state.questionDifficulty = difficulty
    },
    setCategoryID: (state, id) => {
      state.categoryID = id;
    },
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    setSessionToken: (state, token) => {
      state.sessionToken = token;
    },
    setScore: (state, score) => {
      state.score = score
    }
  },
  actions: {
    //async calls
    async fetchQuestions({ commit }, { amount, difficulty, category, sessionToken }) {
      const [error, questions] = await apiGetQuestions(
        amount,
        difficulty,
        category,
        sessionToken
      );

      if (error !== null) {
        return error;
      }

      commit("setQuestions", questions);
      return null;
    },

    async fetchSessionToken({commit}){
      const token = await apiGetSessionToken()

      commit("setSessionToken", token)
    },

    //async calls
    async fetchCategories({ commit }) {
      const categories = await apiGetCategories();

      // if (error !== null) {
      //   return error;
      // }
      commit("setCategories", categories);
      return null;
    },

    async fetchUser({ commit }, { username }) {
      const data = await apiUserDataGet(username.value);

      // Get user data if user exist
      if (data !== null) {
        commit("setUser", username.value);
        commit("setUserID", data[0].id)
        commit("setHighScore", data[0].highScore);

        console.log()
        // Post user if user does not exist
      } else {
        const [error, data] = await apiUserDataPost(username.value);

        if (error !== null) {
          throw new Error(error);
        }

        commit("setUser", data.username);

        localStorage.setItem("trivia-user", JSON.stringify(data));
      }
      return data;
    },
    async updateUserScore( { commit }, { id, highScore }) {
      await apiUserDataPatch(id, highScore)
      commit("setHighScore", highScore)

      return null
    }
  },
});
