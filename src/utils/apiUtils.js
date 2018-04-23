/**
 * 全局请求处理
 *
 * 说明:
 *  所以接口的错误信息都在当前代码里面展示，errorCallback 不允许显示错误信息
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import { Message } from 'element-ui';
Vue.use(VueResource);

var getMessageInstance = function(context){//获取message实例，若context为空，使用Message
  return {//统一消息格式 $success/ $warning/ $info/ $error
    $error: function(options){
      return Message.error(options);
    },
    $warning: function(options){
      return Message.warning(options);
    },
    $info: function(options){
      return Message.info(options);
    },
    $success: function(options){
      return Message.success(options);
    }
  };
}
function handleResponse(context, response, successCallback, errorCallback){
  if(response.data.code == '200'){
    if(successCallback){
      successCallback(response.data.data);
    }
  }else{
    if(errorCallback){
      errorCallback();
    }
  }
}
function handleError(context, response, errorCallback){
  if(response){
    if(response.status == 0){
      getMessageInstance(context).$error('服务器未响应');
    }else if(response.status == 400){
      getMessageInstance(context).$error(response.data.msg || response.data.title || '加载失败');
    }else if (response.status == 401){
      context.$store.dispatch('ACTION_LOGIN_OPEN');
    }else if(response.status == 404){
      getMessageInstance(context).$error('找不到相关信息');
    }else if(response.status == 405){
      getMessageInstance(context).$error('登录失败');
    }else if(response.status == 500){
      getMessageInstance(context).$error('服务器崩溃了');
    }else if(response.status == 503){
      getMessageInstance(context).$error('服务器未开启');
    }else if(response.status == 504){
      getMessageInstance(context).$error('请求超时');
    }else{
      getMessageInstance(context).$error('页面出错啦');
    }
  }else{
    getMessageInstance(context).$error('未知错误');
  }
  if(errorCallback){
    errorCallback();
  }
}
var apiUtils = {
  get: function(context, url, options){
    return context.$http.get(url, options).then((response)=>{
      return response.data.data;
    }).catch((errResponse) => {
      handleError(context, errResponse);
      throw(new Error(''))
    });
  },
  post: function(context, url, body, options){
    return context.$http.post(url, body, options).then((response)=>{
      return response.data.data;
    }).catch((errResponse) => {
      handleError(context, errResponse);
      throw(new Error(''))
    });
  },
  delete: function(context, url, option){
    return context.$http.delete(url, option).then((response) => {
      return response.data.data;
    }).catch((errResponse)=>{
      handleError(context, errResponse);
      throw(new Error(''))
    })
  },
  put: function(context, url, body, options){
    return context.$http.put(url, body, options).then((response)=>{
      return response.data.data;
    }).catch((errResponse) => {
      handleError(context, errResponse);
      throw(new Error(''))
    });
  },
  handle: function(context, err){//异常处理函数
    handleError(context, err);
  },
  jsonToQueryString: function(obj){//普通的对象转url String
    if(!obj){
      return '';
    }
    var result = [];
    for(var key in obj){
      result.push(key + '=' + obj[key]);
    }
    return result.join('&');
  }
};

export default apiUtils;
