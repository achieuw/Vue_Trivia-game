import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import QuestionView from './views/QuestionView.vue'

const routes = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/questions',
    component: QuestionView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})