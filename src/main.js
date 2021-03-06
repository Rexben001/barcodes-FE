import Vue from 'vue';
import VueRouter from 'vue-router';
import VueGTag from 'vue-gtag';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Barcodes from './components/Barcodes';
import Scan from './components/Scan';
import Home from './components/Index';
import App from './App';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/create', component: Barcodes, name: 'Barcodes' },
  { path: '/signup', component: SignUp, name: 'Signup' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
  { path: '/scan', component: Scan, name: 'Scan' },
  { path: '*', redirect: '/' },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('barcodeToken');
  if (to.name === 'Dashboard' && !token) {
    router.push({
      name: 'Login',
    });
  } else {
    next();
  }
});
Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(VueGTag, {
  config: { id: 'G-21F5V0EZTR' },
});

new Vue({
  router,
  render: (h) => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');
