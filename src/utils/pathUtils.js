import routerConfig from '../route/index';
import { isInWhiteList } from './commonUtils';
var md5 = require('md5');
//beta版本功能白名单

var showBeta = function(beta){
  if(isInWhiteList()){
    return true;
  }
  return !beta;
};

var navItemInstance = new Map();
routerConfig.forEach(item => {
  navItemInstance.set(item.name, {
    name: item.name,
    meta: item.meta,
    parent: item.meta.parent || undefined
  });
  if(item.children){
    item.children.forEach(sub => {
      navItemInstance.set(sub.name, {
        name: sub.name,
        meta: sub.meta,
        parent: sub.meta.parent || undefined
      });
    });
  }
});

export default {
  /**
   * 加载全局路由信息，生成ElementUI 需要的 JSON 格式
   */
  getElementNavItem: function(context){
    const basePath = "/home";
    var userPermission = [];//context.$store.state.user.permissions;//用户权限
    var navItem = [];
    routerConfig.forEach(function(element, index){
      element.meta = element.meta || {};
      if(!showBeta(element.meta.beta)){
        return;
      }
      var children = [];
      if(element.children){
        var childList = element.children;
        childList.forEach(function(child, childIndex){
          var hasPermission = true;
          //权限过滤
          if(child.meta.permissions && child.meta.permissions.length > 0){
            hasPermission = false;
            var permissionString = child.meta.permissions.map(_ => { return md5(_) }).join(',');
            for(var i=0; i<userPermission.length; i++){
              hasPermission = hasPermission | (permissionString.indexOf(userPermission[i]) != -1);
            }
          }
          if(!hasPermission){//无权限
            return;
          }


          child.meta = child.meta || {};
          if(!child.meta.hidden){
            if(child.meta.beta){
              if(showBeta(child.meta.beta)){
                children.push({
                  title: child.meta.title,
                  name: child.name,
                  index: (index + '-' + childIndex),
                  path: (basePath + '/' + element.path + '/' + child.path)
                });
              }
            }else{
              children.push({
                title: child.meta.title,
                name: child.name,
                index: (index + '-' + childIndex),
                path: (basePath + '/' + element.path + '/' + child.path)
              })
            }
          }
        });
      }
      if(children.length > 0){
        navItem.push({
          title: element.meta.title,
          name: element.name,
          index: (index + ''),
          sub: children
        })
      }
    });
    return navItem;
  },
  getNavItemByName(name){//通过名字获取路由信息，用于 path.vue
    return navItemInstance.get(name);
  },
  getDefaultActiveIndex(navItem, instance){
    var routeName = instance.$route.name;
    var activeIndex = '';
    if (routeName != 'home') {
      for (var i = 0; i < navItem.length; i++) {
        var parentNav = instance.navItem[i];
        if (parentNav.name == routeName) {
          activeIndex = parentNav.index;
          break;
        }
        for (var j = 0; j < parentNav.sub.length; j++) {
          var childNav = parentNav.sub[j];
          if (childNav.name == routeName) {
            activeIndex = childNav.index;
            break;
          }
        }
      }
    }
    return activeIndex;
  }
}
