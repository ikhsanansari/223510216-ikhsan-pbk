import { createRouter, createWebHistory } from 'vue-router';
import UserPage from '../components/UserPage.vue';
import TodoPage from '../components/TodoPage.vue';
import Album from '../components/Album.vue';

const routes = [
  { path: '/', redirect: '/user' },
  { path: '/user', component: UserPage },
  { path: '/todo', component: TodoPage },
  { path: '/album', component: Album }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
