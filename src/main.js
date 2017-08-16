// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import FastClick from 'fastclick';
import App from './App'
import router from './router';
import 'lib-flexible';
import {WechatPlugin,AjaxPlugin, LoadingPlugin,ToastPlugin,AlertPlugin} from 'vux';
import * as Api from './util/apiList';

FastClick.attach(document.body);

Vue.config.productionTip = true;

Vue.use(Vuex);
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);

const store = new Vuex.Store({});

store.registerModule('vux', {
  state: {
    loading: false,
    showBack: true,
    title: ''
  },
  mutations: {
    updateLoading (state, payload) {
      state.loading = payload.loading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    }
  }
})


router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  store.commit('updateLoading', {isLoading:true})
  store.commit('updateShowBack', true)
  next();
});

router.afterEach((to)=>{
  store.commit('updateLoading',{isLoading:false})
})

Vue.prototype.http = function (opts) {
  let vue  = this;
  vue.$vux.loading.show({
    text:"Loading"
  });
  vue.$http({
    method:opts.method,
    url: Api[opts.url],
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {}
  }).then((response)=>{
    vue.$vux.loading.hide();
    opts.success(response.data);
  }).catch((error)=>{
    vue.$vux.loading.hide();
    if(!opts.error){
      let response = error.response;
      let errorMessage = "请求失败";
      if(response && response.data){
        if(response.data.code == loginTimeOutErrorCode){
          window.location.href = '/';
        }
        errorMessage = response.data.message;
      }
      vue.$vux.alert.show({
        title:'提示',
        content:errorMessage
      });
    }else{
      opts.error(error.response.data);
    }
  });
}

Vue.prototype.get = function (opts) {
  opts.method = 'get';
  this.http(opts);
}

Vue.prototype.post = function (opts) {
  opts.method = "post";
  this.http(opts);
}

Vue.prototype.put = function (opts) {
  opts.method = 'put';
  this.http(opts);
}

Vue.prototype.delete = function (opts) {
  opts.method = 'delete';
  this.http(opts);
}

Vue.prototype.valid = function (opts) {
  let vue = this;
  let valid = true;
  if(opts.ref && !opts.ref.valid){
    valid = false;
  }

  if(opts.ignoreRefs){
    let newRefs = [];
    for(let i in opts.refs){
      let ref = opts.refs[i];
      for(let j in opts.ignoreRefs){
        let ignoreRef = opts.innoreRefs[j];
        if(ref !== ignoreRef){
          newRefs.push(ref);
        }
      }
    }
    opts.refs = newRefs;
  }

  for(let i in opts.refs){
    if(!opts.refs[i].valid){
      valid = false;
      break;
    }
  }

  if(valid){
    opts.success();
  }else if(opts.error){
    opts.error();
  }else{
    vue.$vux.toast.show({
      text:'请检查输入'
    })
  }


}

Vue.prototype.closeShowBack = function () {
  this.$store.commit('updateShowBack', false)
}

Vue.prototype.updateTitle = function (value) {
  this.$store.commit('updateTitle', value)
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box');






