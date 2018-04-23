import CommonPluginRegistry from './plugin';
import CommonWidgetRegistry from './widget';
import FilterRegistry from './filter';


export default {
  register(Vue){
    //注册全局通用组件
    CommonPluginRegistry.register(Vue);
    //注册全局业务组件
    CommonWidgetRegistry.register(Vue);
    //注册全局通用filter
    FilterRegistry.register(Vue);
  }
}

