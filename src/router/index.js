/**
 * Created by ziyu on 2017/8/16.
 */
"use strict";

import Vue from 'vue';
import Router from 'vue-router';

import Home from './../pages/home.vue';
// import Test from './../pages/Test.vue';

Vue.use(Router);

export default new Router({
  mode:'history',
  linkActiveClass:'active',
  routes:[
    {
      path:'*',
      component:Home
    }
    ,{
      path: '/',
      component: Home
    }
    ,{
      path:'/test',
      name:"test",
      // component: Test
      component: function (resolve) {
        require(['./../pages/Test.vue'],resolve)
      }
    }
  ]
});
