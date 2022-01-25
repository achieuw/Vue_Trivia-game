import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import StartView from './views/StartView.vue'
import QuestionView from './views/QuestionView.vue'
import ResultView from './views/ResultView.vue'

const authGuard = (to, from, next) => {
  if(store.state.user === "") {
    next('/')
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
    beforeEnter: authGuard
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