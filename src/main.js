import Vue from 'vue';
import VueRouter from 'vue-router';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import App from './App';

const routes = [
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
