<style lang="less">
  #sloth-login-body{
    background: url("http://imeihao-manage.oss-cn-shanghai.aliyuncs.com/img/login_bg.jpg") no-repeat center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

</style>

<template>
  <div id="sloth-login-body" style="width: inherit;height: inherit">
    <!--<sl-login  :position="true" ref="login" />-->
  </div>
</template>

<script>
  import { ACTION_USER_LOGIN } from 'action';

  export default {
    created(){
      this.$router.push('/home');
    },
    mounted(){
//      if(isInWhiteList()){
//        this.$store.dispatch(ACTION_USER_LOGIN);
//        this.$router.push('/home');
//      }
    }
  }
</script>
