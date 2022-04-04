
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import store from './store';
import axios from 'axios';
import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import VueSidebar from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import Vue3CircleMenu from 'vue3-circle-menu';

// Optional, since every component import their Bootstrap funcionality
// the following line is not necessary
 import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
//import quickMenu from 'vue-quick-menu'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



const app = createApp(App);
//마운트가 무조건 마지막이어야함
app.use(router)
    .use(store)
    .use(BootstrapVue3)
    .use(BootstrapIconsPlugin)
    .use(VueSidebar)
    .use(Vue3CircleMenu)
    .use(VueSweetalert2)
    .mount('#app');


app.config.globalProperties.axios = axios;


