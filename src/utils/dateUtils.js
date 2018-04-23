import moment from 'moment';
moment.locale('zh-cn');


export default {
  _moment: moment,
  getFullYearMonthRange(year){//获取12个月份的日期区间
    var result = [];
    for(let i=0; i< 12; i++){
      result.push(this.getMonthRange(year, i + 1));
    }
    return result;
  },
  getMonthRange: function(year, month){//获取指定月份的起止时间，月份从1开始
    return {
      start: moment([year, month - 1, 1]).toDate().getTime(),
      end: moment([month == 12 ? year + 1 : year, month == 12 ? 0 : month, 1]).add(-1, 'ms').toDate().getTime()
    };
  }
}
