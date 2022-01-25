import { createStore } from "vuex";
import { apiGetQuestions, apiGetSessionToken } from "./api/questions";
import { apiGetCategories } from "./api/categories";
import { apiUserDataGet, apiUserDataPost } from "./api/users";

export default createStore({
  state: {
    user: "",
    highScore: 0,
    score: 0,
    questions: [],
    answers: [],
    categories: [],
    categoryID: 9,
    sessionToken: ""
  },
  getters: {
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
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
    setCategoryID: (state, id) => {
      state.categoryID = id;
    },
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    setSessionToken: (state, token) => {
      state.sessionToken = token;
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
      if (data.length !== 0) {
        commit("setUser", username.value);
        commit("setHighScore", data[0].highScore);

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
  },
});
