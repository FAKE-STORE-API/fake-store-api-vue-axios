import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HomePage from '@/views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/homePage',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/customer/products',
      name: 'customer-products',
      component: () => import('../views/CustomerProductsView.vue'),
    },
  ],
});

export default router;
