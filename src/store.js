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
    questions: [], // fetched questions
    categories: [],
    questionAmount: 1,
    questionDifficulty: "any",
    categoryID: 0,
    sessionToken: ""
  },
  getters: {
  },
  mutations: {
    // set user
    setUser: (state, user) => {
      state.user = user;
    },
    // set user id
    setUserID: (state, id) => {
      state.id = id;
    },
    // set highscore, if highscore doesn't exist default to 0
    setHighScore: (state, highScore = 0) => {
      state.highScore = highScore;
    },
    // set questions
    setQuestions: (state, questions) => {
      state.questions = questions;
    },
    // add answer to question at index and increase score
    addAnswer: (state, { answer, index }) => {
      if (answer === "") { // if answer is empty, change it to "N/A"
        answer = "N/A"
      }
      state.questions[index].answer = answer;
      if(state.questions[index].correct_answer === answer ){ // if answer is correct, add 10 points to score
        state.score += 10;
      }
    },
    // set question amount
    setQuestionAmount: (state, amount) => {
      state.questionAmount = amount
    },
    // set question difficulty
    setQuestionDifficulty: (state, difficulty) => {
      state.questionDifficulty = difficulty
    },
    // set category id
    setCategoryID: (state, id) => {
      state.categoryID = id;
    },
    // set categories
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    // set session token
    setSessionToken: (state, token) => {
      state.sessionToken = token;
    },
    // set score
    setScore: (state, score) => {
      state.score = score
    }
  },
  actions: { //async calls
    // fetch question with specified parameters
    async fetchQuestions({ commit }, { amount, difficulty, category, sessionToken }) {
      const [error, questions] = await apiGetQuestions(
        amount,
        difficulty,
        category,
        sessionToken
      );

      if (error !== null) { // if error, return it and handle it where it was called
        return error;
      }

      commit("setQuestions", questions); // if no error, set questions
      return null; // and return null
    },
    // fetch questions with the same parameters as last time set in store
    async playAgain({ dispatch,state }) {
      const error = await dispatch('fetchQuestions', {
        amount: state.questionAmount,
        difficulty: state.difficulty,
        category: state.categoryID,
        sessionToken: state.sessionToken});

      return error; // returns what fetch questions gives
    },
    // fetch session token
    async fetchSessionToken({commit}){
      const token = await apiGetSessionToken()

      commit("setSessionToken", token) // set token
    },
    // fetch categories
    async fetchCategories({ commit }) {
      const categories = await apiGetCategories();

      commit("setCategories", categories); // set categories
      return null;
    },
    // fetch user
    async fetchUser({ commit }, { username }) {
      const [error,data]= await apiUserDataGet(username.value);

      // Set user data if user exist
      if (error === null) {
        commit("setUser", username.value);
        commit("setUserID", data[0].id)
        commit("setHighScore", data[0].highScore);

      } else { // Post user if user does not exist
        const [error, data] = await apiUserDataPost(username.value);

        if (error !== null) { // if error, return it and handle where it was called
          return error;
        }

        //otherwise set user data
        commit("setUser", data.username);
        commit("setUserID", data.id);

        return null;
      }
      return data;
    },
    // update user score
    async updateUserScore( { commit }, { id, highScore }) {
      commit("setHighScore", highScore) // set highscore
      await apiUserDataPatch(id, highScore) // patch highscore on api

      return null
    }
  },
});
