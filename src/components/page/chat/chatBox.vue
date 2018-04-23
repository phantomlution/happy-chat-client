<style lang="less">
  .sl-chat-box-wrapper{
    background-color: #f5f9fd;
    height: 100%;
    .sl-chat-box_header{
      height: 64px;
      border-bottom: 1px solid #eeeeee;
      .sl-chat-box_header-online-avatar{
        position: relative;
        width: 270px;
        margin-left: 18px;
        margin-top: 7px;
        img{
          width: 46px;
          height: 46px;
          border-radius: 50%;
        }
        img + img{
          margin-left: -24px;
        }
        .el-button{
          position: absolute;
          padding: 8px;
          border:none;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          top: 10px;
          left: 117px;
          color: #b9cddf;
          letter-spacing: 1px;
          &:hover, &:focus{
            color: #b9cddf;
            background: #ffffff;
          }
          span{
            font-size: 12px;
          }
        }
      }

      .sl-chat-box_header-user{
        margin-top: 9px;
        text-align: center;
        font-size: 20px;
      }
      .sl-chat-box_header-online-count{
        margin-top: 2px;
        text-align: center;
        font-size: 14px;
      }
      .sl-chat-box_header-button{
        color: #abbfd4;
        text-align: right;
        /*display: flex;*/
        /*justify-content: space-evenly;*/
        margin-top: 17px;
        .iconfont{
          font-size: 30px;
          &:hover{
            opacity: 0.7;
          }
        }
      }
    }
    .sl-chat-box_content{
      height: calc(~'100%' - 160px);
      background-color: #f5f9fd;
      padding: 20px 20px;
      overflow: auto;
    }
    .sl-chat-box_bottom{
      padding: 8px 0 10px 10px;
      height: 60px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      background: #ffffff;

      .el-input__inner{
        border-color: #ffffff !important;
      }
      .el-input-group__append{
        border-color: #ffffff !important;
        background-color: #ffffff;
      }
      .iconfont{
        font-size: 20px;
        color: #498ac3;
        &:hover{
          opacity: 0.7;
        }
      }
    }
    .sl-chat-box-separator{
      width: 100%;
      height: 0px;
    }
  }

  .sl-chat-message-text-wrapper{
    .sl-chat-message-user-avatar{
      float: left;
    }
    .sl-chat-message-user-message{
      float: left;
      max-width: 80%;
      &:after{
        content: '';
        display: block;
        clear: both;
      }
    }
    &.sl-user-current{
      .sl-chat-message-user-avatar{
        float: right;
      }
      .sl-chat-message-user-message{
        float: right;
      }
      .sl-chat-message-box{
        background: #528fc6;
        color: #ffffff;
        float: right;
        .popper__arrow:after{
          border-left-color: #528fc6;
        }
        &.sl-bg-white{
          background-color: #ffffff;
          .popper__arrow:after{
            border-left-color: #ffffff;
          }
        }
      }

    }
    .sl-chat-message-box{
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) !important;
      background: #fff;
      min-width: 150px;
      border: 1px solid #ebeef5;
      padding: 12px;
      color: #606266;
      line-height: 1.4;
      text-align: justify;
      font-size: 14px;
      margin-bottom: 15px;
      min-width: auto !important;
    }

    &:after{
      display: block;
      content: '';
      clear: both;
    }
  }

  .sl-chat-message-notification-wrapper{
    text-align: center;
    .sl-chat-message-notification-container{
      color:#b2b2b9;
      padding: 14px 9px;
    }
  }

  .sl-chat-box_header-online-avatar-list{
    max-width: 340px;
    img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin-right: 10px;
      margin-bottom: 6px;
    }
  }


</style>

<template>
  <div class="sl-chat-box-wrapper">
    <div class="sl-chat-box_header">
      <el-row>
        <el-col :span="5">
          <el-popover trigger="hover" placement="bottom-start" v-model="avatarListVisible">
            <div class="sl-chat-box_header-online-avatar" slot="reference">
              <img :src="user.avatar" v-for="(user, $index) of roomMemberList" v-if="$index < 5"/>
              <el-button size="mini" circle v-if="roomMemberList.length > 5">+{{ roomMemberList.length - 5 }}</el-button>
            </div>
            <div class="sl-chat-box_header-online-avatar-list">
              <img :src="user.avatar" v-for="(user, $index) of roomMemberList"/>
            </div>
          </el-popover>

        </el-col>
        <el-col :span="14">
          <div class="sl-chat-box_header-user">
            {{ currentUser }}
          </div>
          <div class="sl-chat-box_header-online-count">
            当前共{{ roomMemberList.length }}人在线
          </div>
        </el-col>
        <el-col :span="5">
          <div class="sl-chat-box_header-button">
            <i class="iconfont icon-shipin" style="margin-right: 25px;"/>
            <i class="iconfont icon-web-icon" style="margin-right: 15px;"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="sl-chat-box_content" id="sl_chat_box_content">
      <div :key="$index" v-for="(msg, $index) of messageList">
        <div class="sl-chat-box-separator" v-if="$index > 0 && isDifferentPerson($index)">&nbsp;</div>
        <template v-if="msg.type == 'text'">
          <div class="sl-chat-message-text-wrapper" :class="{ 'sl-user-current': msg.from == currentId }">
            <div class="sl-chat-message-user-avatar">
              <div style="width: 50px;height: 50px">
                <img src="http://imeihao-activity.oss-cn-hangzhou.aliyuncs.com/orange/1.jpg" style="border-radius: 50%"/>
              </div>
             </div>
            <div class="sl-chat-message-user-message">
              <div class="el-popover el-popper sl-chat-message-box" :class="{ 'sl-bg-white': msg.meta.code }" style="max-width: 90%;" :x-placement="msg.from != currentId ? 'right' : 'left'">
                <!--<div class="el-popover__title">标题</div>-->
                <template v-if="msg.meta.code">
                  <sl-code :value="msg.msg" :mode="msg.meta.mode" :readOnly="true"/>
                </template>
                <template v-else>
                  <span style="word-wrap:break-word">
                    {{ msg.msg }}
                  </span>
                </template>
                <div x-arrow="" class="popper__arrow" style="top: 20px" v-if="isDifferentPerson($index)">
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="msg.type == 'notification'">
          <div class="sl-chat-message-notification-wrapper">
            <div class="sl-chat-message-notification-container">
              {{ msg.msg}}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="sl-chat-box_bottom">
      <el-input placeholder="New Message ..." v-model="message" @keyup.enter.native="send">
        <div slot="append">
          <i class="iconfont icon-ai-code" style="font-size: 24px;margin-right: 15px;" @click="codeDialogVisible = true"/>
          <i class="iconfont icon-icon_sent" @click="send"/>
        </div>
      </el-input>
    </div>

    <div class="sl-dialog">
      <el-dialog :visible.sync="codeDialogVisible" title="发送代码">
        <div style="margin-top: -10px;margin-bottom: 20px">
          <span style="font-size: 14px;letter-spacing: 1px;font-weight: 400">选择编程语言:&nbsp;&nbsp;</span>
          <el-select v-model="codeMode">
            <el-option :key="$index" :value="item.value" :label="item.label" v-for="(item, $index) of $enum.codeModeList"></el-option>
          </el-select>
        </div>
        <sl-code v-model="code" :mode="codeMode"></sl-code>
        <div slot="footer" style="margin-top: -20px;">
          <el-button @click="closeCodeDialog">取消</el-button>
          <el-button type="primary" @click="sendCode">发送</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import { MUTATION_CHAT_APPEND_MESSAGE } from 'mutationType';
  export default {
    data(){
      return {
        message: '',
        code: '',
        avatarListVisible: false,
        currentUser: this.$store.state.chat.userInfo.name,
        messageList: [],
        codeDialogVisible: false,
        codeMode: this.$enum.codeModeList[0].value
      }
    },
    computed: {
      roomId(){
        return this.$route.params.id;
      },
      currentId(){
        return this.$store.state.chat.userInfo.id;
      },
      roomMemberList(){
        return this.$store.state.chat.roomInfo.userList;
      }
    },
    watch: {
      messageList(val){
        this.$nextTick(_ => {
          var target = document.getElementById('sl_chat_box_content');
          target.scrollTop = target.scrollHeight;
        });
        this.$bus.$emit('lastMessage', val.length > 0 ? val[val.length - 1] : '');
      },
      roomId(){
        //用户切换频道
        this.messageList = [];
        this.avatarListVisible = false;
        this.$nextTick(_ => {
          this.setHistoryMessage();
        });
      }
    },
    mounted(){
      this.$bus.$on('changed', data => {//修复vue 对 vuex 的list监听不及时的问题
        console.log('-- new data -- ')
        console.log(data);

        if(data.roomId == this.roomId){
          this.messageList.push(data);
        }
      });
      this.setHistoryMessage();
    },
    methods: {
      send(){
        if(!this.message){
          return;
        }
        const message = this.message;
        this.message = '';
        this.sendWorker(message);
      },
      sendCode(){
        const code = this.code;
        this.sendWorker(code, {
          code: true,
          mode: this.codeMode
        }, _ => {
          this.closeCodeDialog();
        });
      },
      sendWorker(message, meta = {}, callback){
        const data = {
          action: 'message',
          from: this.currentId,
          roomId: this.roomId,
          type: 'text',
          msg: message,
          meta: meta
        };
        this.$send(data).then(_ => {
          data.time = new Date().getTime();
          this.$store.commit(MUTATION_CHAT_APPEND_MESSAGE, data);
          this.messageList.push(data);
          if(callback){
            callback();
          }
        }).catch(_ => {
          console.log(_);
          console.log('发送失败');
        });
      },
      isDifferentPerson(index){//当前消息和上一条信息是否是用一个用户
        if(index == 0){
          return true;
        }else{
          const messageList = this.messageList;
          return messageList[index].from != messageList[index - 1].from;
        }
      },
      closeCodeDialog(){
        this.code = '';
        this.codeDialogVisible = false;
      },
      setHistoryMessage(){
        //获取历史消息
        const historyList = this.$store.state.chat.chatInfo[this.roomId] || [];
        if(historyList.length > 0){
          this.$bus.$emit('lastMessage',historyList[historyList.length -1]);
        }
        this.messageList.push.apply(this.messageList, historyList);
        if(historyList.length > 0){
          this.messageList.push({
            action: 'message',
            type: 'notification',
            msg: '以上是历史消息'
          });
        }
      }
    }


  }


</script>
