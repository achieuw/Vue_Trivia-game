import { createStore } from "vuex";
import { apiGetQuestions } from "./api/questions";

export default createStore({
    state: {
        user: "",
        highScore: 0,
        score: 0,
        questions: [],
        answers: []
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
        }
    }
})