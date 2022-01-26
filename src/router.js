import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import StartView from './views/StartView.vue'
import QuestionView from './views/QuestionView.vue'
import ResultView from './views/ResultView.vue'

// prevents the user from navigating to any view other than start before starting the game
const authGuard = (to, from, next) => {
  if(store.state.user === "") {
    next('/')
  } else {
    next()
  }
}

// prevents the user from navigating to questions from result
const resultQuestionGuard = (to, from, next) => {
  if(store.state.questions && store.state.questions[store.state.questions.length - 1].answer) {
    next('/Result')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/Questions',
    component: QuestionView,
    beforeEnter: [authGuard, resultQuestionGuard]
  },
  {
    path: '/Result',
    component: ResultView,
    beforeEnter: authGuard
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})