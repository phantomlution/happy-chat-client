String.prototype.count = function(char){
  if(char.length != 1){
    return -1;
  }
  var count = 0;
  for(var i=0; i< this.length; i++){
    var character = this.charAt(i);
    if(character == char){
      count++;
    }
  }

  return count;
};

const idGenerator = (function* (){//id生成器
  let id = 0;
  while(true){
    yield ++id;
  }
})();


function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function get_suffix(filename){
  var pos = filename.lastIndexOf('.');
  var suffix = '';
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}

export default {
  getLength: function(str){
    /**
     * 获取输入的字符串长度
     * 规则:
     *  中文长度为2
     *  英文长度为1
     */
    var result = 0;
    if(!str || str.length == 0){
      /***/
    }else{
      for(var i=0; i<str.length; i++){
        if(str.charCodeAt(i) > 255){
          result += 2;
        }else{
          result +=1;
        }
      }
    }

    return result;
  },
  getRandomFileName: function(filename, extra){
    var timeStamp = new Date().getTime().toString();
    return timeStamp + random_string(10) + (extra ? extra : '') +  get_suffix(filename);
  },
  nextId: function(){
    return idGenerator.next().value + random_string(15);
  }
}
