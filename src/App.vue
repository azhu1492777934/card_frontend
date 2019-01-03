<template>
  <div id="app">
    <router-view @getToken="refreshToken" v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
  import {_get} from "./http";
  import {codeParam} from "./utilies";
  import {getStorage} from "./utilies";

  export default {
      name:'App',
      methods:{
          refreshToken(){
              _get("/accountCenter/v2/auth/refresh?"+codeParam({
                 token:getStorage('token')
              },'get'))
                  .then((res) => {
                  if(res.data.error == 0){
                      localStorage.setItem("token",res.data.data);
                      location.reload();
                  }
              })
          }
      }
  }
</script>

<style lang="less">
#app {
   max-width: 750px;
   margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
