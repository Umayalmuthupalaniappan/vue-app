import Vue, { createApp } from '@vue/compat';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import BootstrapVue from 'bootstrap-vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
const app = createApp(App)

app.use(createPinia())
app.use(router);
app.component('v-select', vSelect);
app.provide('userName','6d0480d5-2132-56bb-9f04-fec613de2ac4');
app.provide('password', 'fa838754-c2e0-5118-85ba-be8b835b0774');
app.mount('#app')
