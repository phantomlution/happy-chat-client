// 页面中显示加载中的遮罩
import { Loading } from 'element-ui';


var option = {
  target: '#sl-loading-container',
  fullscreen: false,
  text: '加载中'
};
Loading.service(option);

export default {
  open: function(text = option.text){
    this.close();//清空 loading 状态
    document.querySelector(option.target + ' ' + 'p.el-loading-text').innerHTML = text;
    document.getElementById("sl-loading-wrapper").style.display = 'block';
  },
  close: function(){
    document.getElementById("sl-loading-wrapper").style.display = 'none';
  }
}
