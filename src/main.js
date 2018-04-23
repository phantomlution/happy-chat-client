import Vue from 'vue';
import routerConfig from './route/index';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import stores from './store/index';
import dateUtils from 'dateUtils';
import { Message } from 'element-ui';
import loading from 'loadingUtils';
import loginUtils from './utils/loginUtils'
import { isInWhiteList } from './utils/commonUtils';
import validatorUtils from './utils/validatorUtils';
import { ACTION_WINDOW_RESIZE, ACTION_CHAT_CONNECTED, ACTION_CHAT_SERVER_PUSH, ACTION_CHAT_DISCONNECTED } from 'actionType';
import * as enumValue from 'enum';

//websocket配置
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://47.92.36.168:7002');
Vue.use(VueRouter);
Vue.use(Vuex);

// Vue.http.options.timeout = 30 * 1000;
Vue.prototype.$moment = dateUtils._moment;
Vue.prototype.isDev = (function(){//在页面中获取当前环境
  return isInWhiteList();
})();
Vue.prototype.$validator = validatorUtils;
Vue.filter('datePrettier', function(date){
  if(date != undefined || date < 100000){
    return '暂无'
  }else{
    return dateUtils._moment(date).fromNow();
  }
});
Vue.prototype.$enum = enumValue;

//定义全局事件
Vue.prototype.$bus = new Vue();

var i = 1;

const eventCenter = {
  callback: {//回调
  },
  send(requestId, callback){
    if(callback){
      this.callback[requestId] = callback;
    }else{
      console.log('请传入回调函数');
    }
  },
  receive(response){
    if(this.callback[response.requestId]){
      const requestId = response.requestId;
      delete response.requestId;
      if(response.code != 200){
        this.callback[requestId](response);
      }else{
        this.callback[requestId](null, response.data);
      }
    }else{
      console.log('消息未定义');
    }
  }
}
Vue.prototype.$send = function(data){
  const requestId = i++;
  return new Promise((resolve, reject) => {
    console.log(`send sessionId: ${this.$store.state.chat.sessionId}`);
    data.sessionId = this.$store.state.chat.sessionId;
    data.requestId = requestId;
    eventCenter.send(requestId, (err, response) => {
      if(err){
        reject(err);
        if(err.msg){
          this.$message.error(err.msg);
        }
      }else{
        resolve(response);
      }
    });
    this.$socket.emit('chat', data);
  });
}


/**
 * 引入所有的store
 */
const store = new Vuex.Store(stores);

/**
 * 注册路由
 */
const router = new VueRouter({
    routes: [{
        path: '/login',
        component: require('./components/login.vue'),
        meta: { title: '登录' }
    }, {
        path: '/home',
        name: 'home',
        component: require('./components/home.vue'),
        meta: { title: '首页' },
        children: routerConfig
    }, {
        path: '*',
        name: '404',
        meta: { title: '404' },
        component: require('./components/NOTFOUND.vue')
    }]
});

/**
 * 路由拦截器
 */
router.beforeEach((to, from, next) => {
    if(to.name == '404'){//404拦截
      next();
    }else{
      if(store.state.chat.sessionId == -1){//用户没有登录
        if(to.path !== '/home'){
          // Message.error('请重新登录');
          router.push({
            path: '/home',
            query: {
              redirect: to.path
            }
          });
        }else{
          next();
        }
      }else{
        next();
      }
    }
});

/**
 * 全局http拦截器
 */
// Vue.http.interceptors.push(function(request, next) {
//     request.headers.set('X-CSRFToken', window.csrfToken);
//     next();
// });

/**
 * 页面初始化加载框
 */
function startLoadingControl(callback) {
    var closeLoadinMask = function() {
        if (document.getElementById("sloth-web-loading-container")) {
            document.body.removeChild(document.getElementById("sloth-web-loading-container"));
        }
        if (callback) {
            callback();
        }
    }

    //进行动画时间补偿。
    var loadingDuration = 0;
    var diff = new Date().getTime() - window.startMilli;
    if (diff >= loadingDuration) {
        closeLoadinMask();
    } else {
        setTimeout(function() {
            closeLoadinMask();
        }, loadingDuration - diff);
    }
}

var socketInit = false;

new Vue({
  el: '#app',
  store: store,
  router: router,
  http: {
    root: '/',
    headers: {
        Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  sockets:{//["connect", "error", "disconnect", "reconnect", "reconnect_attempt", "reconnecting", "reconnect_error", "reconnect_failed", "connect_error", "connect_timeout", "connecting", "ping", "pong"]
    "connect_error"(){
      this.$store.dispatch(ACTION_CHAT_DISCONNECTED);
      if(!socketInit){
        socketInit = true;
        this.$message.error('连接服务器失败');
      }
    },
    disconnect: function(){
      this.$store.dispatch(ACTION_CHAT_DISCONNECTED);
      this.$message.error('与服务器断开了连接');
    },
    connect: function(){
      this.$store.dispatch(ACTION_CHAT_CONNECTED);
      if(!socketInit){
        socketInit = true;
      }
    },
    res: function(res){
      console.log(res);
      if(res.requestId){
        eventCenter.receive(res);
      }else{//服务端主动推动
        if(res.action == 'message'){
          console.log('---- 开始收到了服务端的消息 ---');
          console.log(res);
          console.log('---- end ----');
        }
        this.$store.dispatch(ACTION_CHAT_SERVER_PUSH, res).then(_ => {
          //vue监听vuex里面的list好像会有很长的延迟，所以手动加进去
          if(res.action == 'message'){
            console.log(_);
            this.$bus.$emit('changed', res);
          }
        });
      }

    }
  },
  mounted: function() {
    var vm = this;
    vm.registerWindowObject();

    this.setWindowInfo();
    window.addEventListener('resize', _ => {
      this.setWindowInfo();
    });

    vm.afterMounted();
    startLoadingControl(function() {
        var path = ''; //获取当前路由的路径
        if (router.mode != undefined && router.mode == 'history') { //使用 history 导航模式
            path = window.location.pathname;
        } else { //使用hash导航模式
            path = window.location.hash.substring(1, window.location.hash.length);
        }
        if (path.length == '' || path == '/') {
            router.push('/login');
        }
    });
  },
  methods: {
    registerWindowObject(){//在window对象中注入函数，方便其他组件中调用(ueditor)
      window.$message = this.$message;
      window.$loading = loading;
    },
    afterMounted(){
      if(isInWhiteList()){
        document.title = `测试(${location.hostname}) - ${document.title}`;
      }
    },
    setWindowInfo(){
      this.$store.dispatch(ACTION_WINDOW_RESIZE, {
        height: document.documentElement.clientHeight
      });
    }
  }

});
