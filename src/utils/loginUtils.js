var sessionStorage = window.sessionStorage;
var md5 = require('md5');
const loginKey = md5('isLogin');

if(!sessionStorage.getItem(loginKey)){
  sessionStorage.setItem(loginKey, false);
}
export default {
  getLoginState: function(){
    return true;
    // return JSON.parse(sessionStorage.getItem(loginKey));
  },
  setLoginState: function(state){
    sessionStorage.setItem(loginKey, state);
  }
}
