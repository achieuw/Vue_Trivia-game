import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'

const routes = [
  {
    path: '/',
    component: StartView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})