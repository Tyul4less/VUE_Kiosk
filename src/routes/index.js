import { createRouter, createWebHistory } from 'vue-router'
//import FirstPage from './FirstPage'
import MainPage from './MainPage'
import MenuSelection from "./MenuSelection";
import PaymentPage from "./PaymentPage";
import ThanksPage from "./ThanksPage";
import Test from "./Test";


const routes = [
/*    {
        path : '/',
        component : FirstPage,
        mode: "history",
        name: "FirstPage"
    },*/
    {
        path: '/',
        component: MainPage,
        mode: "history",
        name: 'MainPage',
/*        beforeEnter: function (to, from, next) {
            console.log(to)
            console.log(from)
            console.log(next)
            if()
        }*/
    },
    {
        path : '/MenuSelection',
        component : MenuSelection,
        mode : 'history',
        name : 'MenuSelection'
    },
    {
        path: '/PaymentPage',
        component: PaymentPage,
        mode: 'history',
        name: 'PaymentPage'
    },
    {
        path : '/ThanksPage',
        component : ThanksPage,
        mode : 'history',
        name : 'ThanksPage'
    },
    {
        path : '/Test',
        component : Test,
        mode : 'history',
        name : 'Test'
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;