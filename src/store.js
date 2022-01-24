import { createStore } from "vuex";
import { apiGetCategories } from "./api/categories";
import { apiUserDataGet, apiUserDataPost } from "./api/users";

const setUserData = async (username, highScore) => {
  await commit("setUser", username)
  await commit("setHighScore", highScore)
}

export default createStore({
  state: {
    user: "",
    highScore: 0,
    score: 0,
    questions: [],
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setScore: (state, score) => {
      state.score = score;
    },
    setHighScore: (state, highScore) => {
      state.highScore = highScore;
    },
    setQuestions: (state, questions) => {
      state.questions = questions;
    },
  },
  actions: {
    //async calls
    async fetchQuestions({ commit }) {
      const questions = await apiGetCategories();

      // if (error !== null) {
      //   return error;
      // }
      console.log(questions)
      commit("setQuestions", questions);
      return null;
    },

    async fetchUser({ commit }, { username }) {
        const data = await apiUserDataGet(username.value);

        console.log(data)

        // Get user data if user exist
        if(data.length !== 0) {
          commit("setUser", username.value)
          commit("setHighScore", data[0].highScore)

          // Post user if user does not exist
        } else { 
          const [ error, data ] = await apiUserDataPost(username.value);
  
          if (error !== null) {
            throw new Error(error);
          }

          commit("setUser", data.username);

          localStorage.setItem("trivia-user", JSON.stringify(data));
        }
        return data;
      }
    },
});
