/**
 * 注册store
 */

// import userModule from './modules/user';
import systemModule from './modules/system';
import chatModule from './modules/custom/chat';

export default {
    modules: {
      // user: userModule,
      system: systemModule,
      chat: chatModule
    }
}

