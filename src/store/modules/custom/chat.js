import { ACTION_CHAT_CONNECTED, ACTION_CHAT_LOGIN, ACTION_CHAT_ENTER_ROOM, ACTION_CHAT_SERVER_PUSH, ACTION_CHAT_DISCONNECTED } from 'actionType'
import { MUTATION_CHAT_CONNECTED, MUTATION_CHAT_LOGIN, MUTATION_CHAT_ROOM_SET, MUTATION_CHAT_APPEND_MESSAGE, MUTATION_CHAT_DISCONNECTED } from 'mutationType';


const USER_SESSION_ID = "sessionKey";

export default {
  state: {
    connected: false,
    sessionId: -1,
    userInfo: {
    },
    roomInfo: {
    },
    chatInfo: {

    }
  },
  mutations: {
    [MUTATION_CHAT_LOGIN](state, userInfo){
      console.log(`sessionId: ${userInfo.id}`)
      console.log(userInfo);
      state.sessionId = userInfo.id;
      state.userInfo = userInfo;
    },
    [MUTATION_CHAT_CONNECTED](state){
      state.connected = true;
    },
    [MUTATION_CHAT_DISCONNECTED](state){
      state.connected = false;
    },
    [MUTATION_CHAT_ROOM_SET](state, roomInfo){
      state.roomInfo = roomInfo;
      const roomId = roomInfo.meta.roomId;

      if(!state.chatInfo[roomId]){
        const historyList = (roomInfo.messageList || []);
        state.chatInfo[roomId] = historyList;
      }
    },
    [MUTATION_CHAT_APPEND_MESSAGE](state, response){
      const roomId = response.roomId;
      if(!state.chatInfo[roomId]){
        state.chatInfo[roomId] = [];
      }
      state.chatInfo[roomId].push(response);
    },
  },
  actions: {
    [ACTION_CHAT_CONNECTED](context){//服务端建立链接
      context.commit(MUTATION_CHAT_CONNECTED);
    },
    [ACTION_CHAT_DISCONNECTED](context){//断开了连接
      context.commit(MUTATION_CHAT_DISCONNECTED);
    },
    [ACTION_CHAT_LOGIN](context, userInfo){//用户登录
      context.commit(MUTATION_CHAT_LOGIN, userInfo);
    },
    [ACTION_CHAT_ENTER_ROOM](context, roomInfo){
      context.commit(MUTATION_CHAT_ROOM_SET, roomInfo);
    },
    [ACTION_CHAT_SERVER_PUSH](context, response){
      //接受到服务端的推送
      console.log(response.action);
      if(response.action == 'message'){
        context.commit(MUTATION_CHAT_APPEND_MESSAGE, response);

        return 'position 1';
      }else if(response.action == 'roomInfoChanged'){
        context.commit(MUTATION_CHAT_ROOM_SET, response.room);
      }else{
        console.log(`没有对应的handler: ${response.action}`)
        console.log(response);
      }
    }
  }
}
