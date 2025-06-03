import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HomePage from '@/views/customer/HomePage.vue';

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
      component: () => import('../views/customer/CustomerProductsView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('../views/customer/ProductDetailsView.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/AdminDashboardView.vue'),
    },
  ],
});

export default router;
