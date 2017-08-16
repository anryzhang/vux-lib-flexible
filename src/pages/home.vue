<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <h2  class="xlp"></h2>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <router-link to="Test">test</router-link>

    <div >{{count}}</div>
    <div>
      <button @click="increment">+</button>
    </div>
    <loading></loading>
  </div>

</template>

<script>
import { Group, Cell,Loading,cookie } from 'vux';
import Vuex from 'vuex';
import {mapState} from 'vuex';


export default {
  components: {
    Group,
    Cell,
    Loading
  },

  data () {
    return {
      msg: 'Hello World!',
      n:10,
      count:0
    }
  },
  created(){
    let vue = this;
    vue.closeShowBack();
    vue.updateTitle('首页');
    vue.get({
      url:'orderMeetDetail',
      headers:{
        'token':cookie.get('token')
      },
      params:{
        appointmentId:47
      },
      success:function (res) {
        console.log(res);
      }
    })
  },
  methods:{
    loadMore(){
      this.n += 10;
    },
    refresh(){
      this.n = 10;
    }
    ,increment(){
//      store.commit('increment');
      this.count++;
    }
  }


}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.xlp{
  width:750px;background: #000;height:20px
}
</style>
