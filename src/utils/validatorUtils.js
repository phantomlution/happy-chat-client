/**
 * 全局表单验证器
 */
import stringUtils from './stringUtils';
//金额正则
var moneyRegex = /^[0-9]+(\.[0-9]?[0-9])?$/;
var colorRegex = /^[0-9A-F]{6}$/;
var faxRegex  = /^(\d{3,4}-)?\d{7,8}$/;
var telRegex = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
var postCodeRegex = /^\d{6}$/;
var phoneRegex = /^[1][3, 4, 5, 6, 7, 8, 9][0-9]{9}$/;
export default {
  dateRangeValidator(rule, value, callback){ //日期区间校验器
    if(value.length == 0){
      callback(new Error('请选择日期区间'));
    }else{
      if(!value[0] || !value[1]){
        callback(new Error('请选择日期区间'));
      }else{
        callback();
      }
    }
  },
  countValidator(rule, value, callback){//数量校验( >= 1)
    value = (value || '').toString();
    if(value.length == 0){
      callback();
    }else{
      if(isNaN(value)){
        callback(new Error('请输入有效的数字'));
      }else{
        var intValue = parseInt(value);
        if(intValue < 1){
          callback(new Error('数字必须大于1'))
        }else if(intValue != value){
          callback(new Error('请输入正整数'));
        }else{
          callback();
        }
      }
    }
  },
  integerValidator(rule, value, callback){//数量校验( >= 0)
    value = value.toString();
    let { required } = rule;
    if(value.length == 0){
      if(required){
        callback(new Error('请输入有效的数字'));
      }else{
        callback();
      }
    }else{
      if(isNaN(value)){
        callback(new Error('请输入有效的数字'));
      }else{
        var intValue = parseInt(value);
        if(intValue < 0){
          callback(new Error('数字必须大于0'))
        }else if(intValue != value){
          callback(new Error('请输入正整数'));
        }else{
          callback();
        }
      }
    }
  },
  numberValidator(rule, value = '', callback){
    if(isNaN(value)){
      callback(rule.message || '请输入有效的数字');
    }else{
      callback();
    }
  },
  moneyValidator(rule, value, callback){//金额校验
    function rangeCheck(){//金额区间校验
      if(value < 0){
        callback(new Error('金额必须大于0'));
      }else{
        if(rule.min != undefined){
          if(value < rule.min){
            callback('金额不可小于 ' + rule.min + '元');
          }
        }
        if(rule.max){
          if(value > rule.max){
            callback(new Error('金额不得大于' + rule.max + '元'));
            return;
          }
        }
        callback();
      }
    }
    value = value || '';
    value = value.toString();
    if(value.length == 0 && rule.required != undefined && !rule.required){
      callback();
      return;
    }
    if(value.length == 0){
      callback('请输入金额');
    }else if(isNaN(value)){
      callback(new Error('金额无效'));
    }else{
      var stringValue = value + '';
      if(stringValue.lastIndexOf('.') != -1){
        var dotNumberCount = stringValue.substring(stringValue.lastIndexOf(".") + 1).length;//金额最多精确到分
        if(dotNumberCount > 2){
          callback(new Error('金额最多为2位小数'));
        }else{
          if(!moneyRegex.test(value)){
            callback(new Error('请输入正确的金额'));
          }else{
            rangeCheck();
          }
        }
      }else{
        if(!moneyRegex.test(stringValue)){
          callback(new Error('请输入正确的金额'));
        }else{
          rangeCheck();
        }
      }
    }
  },
  arrayRequiredValidator: function(rule, value, callback){//数组必填验证
    if(value.length == 0){
      callback(rule.message || '必填');
      return;
    }
    callback();
  },
  lengthValidator: function(rule, value, callback){//针对以下情况： 例如允许10个汉字，20个英文字符
    var length = rule.length || 0;
    if(stringUtils.getLength(value) > (2 * length)){
      callback('最多可输入' + length + '个字');
    }else{
      callback();
    }
  },
  discount10Validator: function(rule, value, callback){//折扣率 0.1 - 10
    function rangeCheck(){//金额区间校验
      if(value <= 0){
        callback(new Error('折扣率必须大于0'));
      }else{
        if(value > 10){
          callback(new Error('折扣率不得大于10'));
        }else{
          callback();
        }
      }
    }

    value = value.toString();
    if(value.length == 0 || isNaN(value)){
      callback(new Error('请输入有效的折扣'));
    }else{
      var stringValue = value + '';
      if(stringValue.lastIndexOf('.') != -1){
        var dotNumberCount = stringValue.substring(stringValue.lastIndexOf(".") + 1).length;//金额最多精确到分
        if(dotNumberCount > 1){
          callback(new Error('折扣率最多为1位小数'));
        }else{
          if(!moneyRegex.test(value)){
            callback(new Error('请输入正确的折扣率'));
          }else{
            rangeCheck();
          }
        }
      }else{
        if(!moneyRegex.test(stringValue)){
          callback(new Error('请输入正确的折扣率'));
        }else{
          rangeCheck();
        }
      }
    }
  },
  discountValidator: function(rule, value, callback){//折扣检验规则
    function rangeCheck(){//金额区间校验
      if(value <= 0){
        callback(new Error('折扣率必须大于0'));
      }else{
        if(value > 1){
          callback(new Error('折扣率不得大于1'));
        }else{
          callback();
        }
      }
    }

    value = value.toString();
    if(value.length == 0 || isNaN(value)){
      callback(new Error('请输入有效的折扣'));
    }else{
      var stringValue = value + '';
      if(stringValue.lastIndexOf('.') != -1){
        var dotNumberCount = stringValue.substring(stringValue.lastIndexOf(".") + 1).length;//金额最多精确到分
        if(dotNumberCount > 2){
          callback(new Error('折扣率最多为2位小数'));
        }else{
          if(!moneyRegex.test(value)){
            callback(new Error('请输入正确的折扣率'));
          }else{
            rangeCheck();
          }
        }
      }else{
        if(!moneyRegex.test(stringValue)){
          callback(new Error('请输入正确的折扣率'));
        }else{
          rangeCheck();
        }
      }
    }
  },
  urlValidator: function(rule, value, callback){
    value = (value || '').trim().toString();
    if(value.length == 0){
      callback();
    }else if(value.indexOf('http') != 0){
      callback('请输入有效的链接');
    }else{
      callback();
    }
  },
  thirdLevelValidator: function(rule, value, callback){
    if(value.length == 0){
      callback('必填');
    }else if(value.length != 3){
      callback('必须选择三级节点');
    }else{
      callback();
    }
  },
  numberValidator: function(rule, value, callback){
    if(value == undefined){
      value = value || '';
    }
    if(value.length == 0){
      callback();
      return;
    }
    if(isNaN(value)){
      callback('请输入有效的数字');
    }else{
      callback();
    }
  },
  colorValidator: function(rule, value, callback){
    value = value || '';
    value = value.toUpperCase();
    if(value.length == 0){
      callback();
    }else{
      if(colorRegex.test(value)){
        callback();
      }else{
        callback('请填写正确的6位色号')
      }
    }
  },
  passwordValidator: function(rule, value, callback){
    value = value || '';
    if(value.length == 0){
      callback('请输入密码');
      return;
    }else if(value.length < 6){
      callback('密码至少为6位');
      return;
    }else if(!/[a-zA-Z0-9_]/g.test(value)){
      callback('密码只能数字，字母，或者下划线');
    }else{
      if(!/[a-zA-z]/g.test(value)){
        callback('密码不能为纯数字');
      }else{
        callback();
      }
    }
  },
  faxValidator(rule, value = "", callback){//公司传真
    if(!value){
      return callback();
    }
    if(faxRegex.test(value)){
      callback();
    }else{
      callback('传真格式错误');
    }
  },
  telValidator(rule, value = "", callback){
    if(!value){
      return callback();
    }
    if(telRegex.test(value)){
      callback();
    }else{
      callback('电话格式错误');
    }
  },
  postCodeValidator(rule, value = '', callback){
    if(!value){
      return callback();
    }
    if(postCodeRegex.test(value)){
      callback();
    }else{
      callback('邮编格式错误');
    }
  },
  phoneValidator(rule, value = '', callback){
    if(!value){
      return callback();
    }
    if(phoneRegex.test(value)){
      callback();
    }else{
      callback('手机号码格式错误');
    }
  }
}
