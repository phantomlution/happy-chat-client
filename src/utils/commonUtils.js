const whiteDevelopmentHost = ['localhost', '127.0.0.1', '192.168.210.228'];

/**
 * 当前环境是否在白名单中
 */

const hostname = window.location.hostname;
export const isInWhiteList = function(){
  return whiteDevelopmentHost.indexOf(hostname) != -1;
};

export const getFrontDomain = function(){
  if(hostname.indexOf(backendPublishDomain) != -1){//正式环境
    return frontPublishDomain;
  }else{
    return frontTestDomain;
  }
};
