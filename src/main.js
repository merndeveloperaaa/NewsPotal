import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import NProgress from 'nprogress';

import App from './App.vue';
import NewsCreate from './components/NewsCreate.vue';
import NewsEdit from './components/NewsEdit.vue';
import NewsList from './components/NewsList.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/nprogress/nprogress.css'
import '../public/my.css'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const routes = [
  {
    name: 'Create',
    path: '/create',
    component: NewsCreate
  },
  {
    name: 'Edit',
    path: '/edit/:newsId/:userId',
    component: NewsEdit
  },
  {
    name: 'List',
    path: '/list',
    component: NewsList
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
