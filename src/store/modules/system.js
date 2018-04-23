/**
 * [基础模块] 系统相关信息 & 浏览器相关信息
 */

import { ACTION_WINDOW_RESIZE } from 'actionType';
import { MUTATION_WINDOW_RESIZE } from 'mutationType';


export default {
  state: {
    windowHeight: 0,
    currentUserId: '00001',
    userInfo: {

    }
  },
  mutations: {
    [MUTATION_WINDOW_RESIZE](state, height){
      state.windowHeight = height;
    }
  },
  actions: {
    [ACTION_WINDOW_RESIZE](context, { height }){
      context.commit(MUTATION_WINDOW_RESIZE, height)
    }
  }
}

