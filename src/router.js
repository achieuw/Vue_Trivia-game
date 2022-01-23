import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import QuestionView from './views/QuestionView.vue'
import ResultView from './views/ResultView.vue'

const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/Questions',
    component: QuestionView
  },
  {
    path: '/Result',
    component: ResultView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})