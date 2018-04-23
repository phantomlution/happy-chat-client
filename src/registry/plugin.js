/**
 * 注册通用控件
 */
import SlCode from '../components/plugin/code.vue';
const list = [];

list.push(SlCode);


export const pluginList = list;

export default {
  register(Vue){
    pluginList.forEach(item => {
      Vue.component(item.name, item);
    });
  }
}
