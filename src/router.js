import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './views/HomePage.vue';
//import Login from './views/Login.vue';
//import CompanyForm from './views/CompanyForm.vue';
import CompanyList from './views/CompanyList.vue';
import TownList from './views/TownList.vue';
import CountryList from './views/CountryList.vue';
import CurrencyList from './views/CurrencyList.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/login',
        name: 'login',
//        component: Login,
      },
      {
        path: '/company',
        name: 'company',
       // component: CompanyForm,
      },
      {
        path: '/companies',
        name: 'companylist',
        component: CompanyList,
      },
      {
        path: '/towns',
        name: 'townlist',
        component: TownList,
      },
      {
        path: '/countries',
        name: 'countrylist',
        component: CountryList,
      },
      {
        path: '/currency',
        name: 'currencylist',
        component: CurrencyList,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
       // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      },
    ],
  });
  