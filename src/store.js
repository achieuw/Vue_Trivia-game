import { createStore } from "vuex";
import { apiGetCategories } from "./api/categories";

export default createStore({
    state: {
        user: "",
        highScore: 0,
        score: 0,
        questions: []
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
        }
    },
    actions: { //async calls
        async fetchQuestions({ commit }) {
            const [ error, questions ] = await apiGetCategories()

            if( error !== null) {
                return error
            }

            commit("setQuestions", questions)
            return null
        }
    }
})