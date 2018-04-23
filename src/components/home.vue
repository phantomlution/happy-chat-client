<style lang="less">
  @import '../../node_modules/element-ui/lib/theme-chalk/index.css';
</style>


<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import pathUtils from '../utils/pathUtils';
  import Registry from '../registry/index';
  import { isInWhiteList } from '../utils/commonUtils';
  import { ACTION_CHAT_LOGIN } from 'actionType';

  Vue.use(ElementUI);
  Registry.register(Vue);//注册通用组件

  export default {
    created: function () {
      var instance = this;
      instance.navItem = pathUtils.getElementNavItem(instance);
      //刷新页面后，设置当前路由
      instance.defaultActive = pathUtils.getDefaultActiveIndex(instance.navItem, instance);
    },
    data: function () {
      return {
        defaultActive: '',
        navItem: []
      }
    },
    methods: {
      forward: function (path) {
        this.$router.push(path)
      },
      toDashBoard(){
        console.log('123');
        console.log('toDashBoard'  + this.$store.state);

        this.$router.push('/home/chat');
      },
      solveMyRiddle(){
        this.$prompt("穿最多的衣服, 开最快的车。打一主播", "答题赢Token", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$send({
            action: 'login',
            answer: value
          }).then(response => {
            this.$store.dispatch(ACTION_CHAT_LOGIN, response).then(_ => {
              this.$message.success('登录成功');
              this.toDashBoard();
            });
          }).catch(_ => {
            this.solveMyRiddle();
          });
        }).catch(_ => {
        });
      }
    },

    mounted(){
      this.solveMyRiddle();
    },
    computed: {
      loginDialogVisible:{
        get(){
          return this.$store.state.system.loginDialogVisible;
        },
        set(bool){
          if(bool){
            this.dialogLoginOpen();
          }else{
            this.dialogLoginClose();
          }
        }
      }
    },
  }
</script>


