import { createStore } from "vuex";
import { apiGetQuestions } from "./api/questions";
import { apiGetCategories } from "./api/categories";

export default createStore({
    state: {
        user: "",
        highScore: 0,
        score: 0,
        questions: [],
        answers: [],
        categoryID: 9
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
        addAnswer: (state, answer) => {
            state.answers.push(answer)    
        },
        setCategoryID: (state, id) => {
          state.categoryID = id;
        }
    },
    actions: { //async calls
        async fetchQuestions({ commit }, { amount, difficulty, category }) {
            const [ error, questions ] = await apiGetQuestions( amount, difficulty, category)

            if( error !== null) {
                return error
            }

            commit("setQuestions", questions)
            return null
        },
        //async calls
    async fetchCategories({ commit }) {
      const questions = await apiGetCategories();

      // if (error !== null) {
      //   return error;
      // }
      commit("setQuestions", questions);
      return null;
    },

    async fetchUser({ commit }, { username }) {
        const data = await apiUserDataGet(username.value);

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
