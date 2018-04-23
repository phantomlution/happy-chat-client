// /**
//  * [基础模块]用户登录 & 用户个人信息
//  */
// import * as mutations from '../mutationType';
// import * as actions from '../actionType';
//
// import loginUtils from '../../utils/loginUtils';
// var md5 = require('md5');
// const userInfoKey = md5('userInfo');
// var userInfo = null;
//
//
// if(loginUtils.getLoginState() && sessionStorage.getItem(userInfoKey)){
//   userInfo = JSON.parse(sessionStorage.getItem(userInfoKey));
// }
//
// export default {
//     state: {
//       auth_name: userInfo ? userInfo.auth_name : '',
//       email: userInfo ? userInfo.email: '',
//       name: userInfo ? userInfo.name : '',
//       permissions: userInfo ? userInfo.permissions : [],
//       phone: userInfo ? userInfo.phone : '',
//       _id: userInfo ? userInfo._id.toString() : ''
//     },
//     mutations: {
//         [mutations.MUTATION_USER_SET_INFO](state, userResponse = {}){
//           //混淆权限字符串
//           if(userResponse.permissions){
//             userResponse.permissions = userResponse.permissions.map(permission => {
//               return md5(permission);
//             });
//           }
//
//           Object.assign(state, userResponse);
//           sessionStorage.setItem(userInfoKey, JSON.stringify(state));
//         },
//         [mutations.MUTATION_USER_LOGIN](state){
//           loginUtils.setLoginState(true);
//         },
//         [mutations.MUTATION_USER_LOGOUT](state){
//           sessionStorage.removeItem(userInfoKey);
//           loginUtils.setLoginState(false);
//         }
//     },
//     actions: {
//         [actions.ACTION_USER_LOGIN](context, userResponse){
//           context.commit(mutations.MUTATION_USER_LOGIN);
//           if(userResponse){
//             context.commit(mutations.MUTATION_USER_SET_INFO, userResponse);
//           }
//         },
//         [actions.ACTION_USER_LOGOUT](context){
//             context.commit(mutations.MUTATION_USER_LOGOUT)
//         }
//     }
// }
