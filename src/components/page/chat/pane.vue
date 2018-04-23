<style lang="less">
  .sl-chat-cell-wrapper{
    height: 100%;
    overflow: auto;
    background: #243340;
    .sl-chat-cell-container{
      height: 88px;
      border-bottom: 1px solid #2f3f4e;
      &.sl-current{
        background-color: #30404f;
        box-shadow: #212f3b 0 0 10px;
      }
      &:hover{
        background-color: #30404f;
        box-shadow: #212f3b 0 0 10px;
      }


      .sl-chat-cell_icon{
        display: flex;
        align-items:center;
        justify-content:center;
        height: 100%;
        img{
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: block;
        }
      }
      .sl-chat-cell_title{
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
        margin-top: 21px;
        .iconfont{
          font-size: 16px;
          color: #738391;
        }
      }
      .sl-chat-cell_description{
        font-size: 14px;
        margin-top: 8px;
        color: #ffffff;
      }
      .sl-text-overflow{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .sl-chat-cell_time{
        font-size: 14px;
        margin-top: 20px;
        color: #697d87;
        text-align: center;
      }
      .sl-chat-cell_bubble{
        text-align: center;
        margin-top: 8px;
        .el-badge__content{
          background-color: #528fc6;
          border: none;
        }
      }
    }
  }
</style>

<template>
  <div style="width: 100%;">
      <!--{{ list }}-->
      <div :style="{ 'height': $store.state.system.windowHeight + 'px', width: '400px', 'float': 'left' }">
        <div class="sl-chat-cell-wrapper">
          <el-row :key="$index" class="sl-chat-cell-container" v-for="(cell, $index) in list" :class="{ 'sl-current': $index == currentIndex }" @click.native.stop="changeRoom($index)">
            <el-col :span="7" class="sl-chat-cell_icon">
              <img :src="cell.groupIcon" />
            </el-col>
            <el-col :span="12" >
              <div class="sl-chat-cell_title sl-text-overflow">
                <i class="iconfont icon-tubiao"></i>&nbsp;{{ cell.groupName }}
              </div>
              <div class="sl-chat-cell_description sl-text-overflow">
                {{ cell.lastMessage }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="sl-chat-cell_time">
                {{ cell.lastReceiveTime | datePrettier }}
              </div>
              <div class="sl-chat-cell_bubble">
                <template v-if="$store.state.chat.connected">
                  <el-button type="success" circle size="mini" style="padding: 6px;"></el-button>
                </template>
                <template v-else>
                  <el-button type="info" circle size="mini" style="padding: 6px;"></el-button>
                </template>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div :style="{ 'height': $store.state.system.windowHeight + 'px', 'float': 'left', 'width': 'calc(100% - 400px)' }">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
  import { ACTION_CHAT_ENTER_ROOM } from 'actionType';

  export default {
    data(){
      return {
        currentIndex: -1,
        list: [
        ]
      }
    },
    mounted(){
      this.getRoomList();
      this.$bus.$on('lastMessage', data => {
        const room = this.list.find(_ => { return _.roomId == data.roomId });

        if(room){
          data.meta = data.meta || {};
          if(data.meta.code){
            room.lastMessage = '[代码片段]';
          }else{
            room.lastMessage = data.msg;
          }
          room.lastReceiveTime = data.time || 0;
          room.newMessageCount = 0;
        }
      });

      //消息触达事件进行实时更新
      var add = false;
      setInterval(_ => {
        add = !add;
        this.list.forEach(item => {
          item.lastReceiveTime += (add ? 1 : -1);
        });
      }, 5 * 1000);
    },
    methods: {
      getRoomList(){
        this.$send({
          action: 'getRoomList'
        }).then(response => {
          console.log('-- getRoomList -- ')
          console.log(response);
          this.list = response;
          this.setMainRoom();
        }).catch(_ => {
        });
      },
      setMainRoom(){//用户登录后跳转到主房间
        if(this.currentIndex < 0 && this.list.length > 0){
          this.changeRoom(0);
        }
      },
      changeRoom(index){
        if(this.currentIndex == index){
          return;
        }
        const roomId = this.list[index].roomId;
        console.log(roomId);
        this.$nextTick(_ => {
          this.$send({
            action: 'enterRoom',
            roomId: roomId
          }).then(response => {
            this.$store.dispatch(ACTION_CHAT_ENTER_ROOM, response);
            this.$message.success(`欢迎加入${roomId}房间`);
            this.currentIndex = index;
            this.$router.push({
              name: 'chatPane',
              params: {
                id: roomId
              }
            })
          }).catch(_ => {
            console.log(_);
          })
        });


      }
    }
  }
</script>
