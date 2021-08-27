import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NewTask from '@/views/NewTask'
import Comments from '@/views/Comments'
import EditTask from "../views/EditTask";


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem("loggedIn") == false){
          next('/');
        }else{
          next();
        }
      }
    },
    {
      path: '/new',
      name: 'new',
      component: NewTask
    },
    {
      path: '/edit/:id',
      name: 'editTask',
      component: EditTask
    },
    {
      path: '/comments/:id',
      name: 'comments',
      component: Comments
    },
  ]
})
