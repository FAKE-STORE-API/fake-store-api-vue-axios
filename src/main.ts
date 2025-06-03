import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

//Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

import BaseLayout from './components/base/BaseLayout.vue';

const app = createApp(App);

app.component('BaseLayout', BaseLayout);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');
