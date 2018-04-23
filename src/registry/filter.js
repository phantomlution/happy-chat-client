/**
 * 注册全局 filter
 */

import { activityState, publishState, channelType, moduleType, editState, enableType, propType, specItemMode, attrItemMode, moduleTypeNew, couponReleaseList, platformsList, discountTypeTip } from 'enum';

var moment = require('moment');
moment.locale('zh-cn');

export default {
  register(Vue){
    Vue.filter('date', function(date){//后台时间只精确到秒
      if(!date){
        return '-';
      }
      return moment(date * 1000).format('YYYY年MM月DD日 H:mm');
    });

    Vue.filter('dateFormat', function (date) {
      //date 为 milliseconds
      if(!date){
        return '-';
      }
      return moment(date).format('YYYY年MM月DD日 H:mm');
    });
    Vue.filter('simple', function(date){
      if(!date){
        return '-';
      }
      return moment(date).format('YYYY-MM-DD');
    });
  }
}
