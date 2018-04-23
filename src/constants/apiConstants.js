//API 前缀
var API_PREFIX = "/wechat/api";
var DEV_PREFIX = '/api';
module.exports = {
  API_PREFIX: API_PREFIX,
  ApiMapper: {
    LOGIN: DEV_PREFIX + '/user_internal/session',
    CHANNEL_WUXIAOBO_LIST: API_PREFIX + '/channel/wuxiaobo/list',
    TOPNAV_LIST: DEV_PREFIX + '/marketing/navigation/paging',//上导航分页
    TOPNAV_ADD: DEV_PREFIX + '/marketing/navigation',//新建上导航
    TOPNAV_MODULE_ADD: DEV_PREFIX + '/marketing/navigation/module',//上导航模块
    TOPNAV_BAIJIANG_ZHUANLAN: API_PREFIX + '/topNav/baiJiang/zhuanLan',
    TOPNAV_WUXIAOBO_SHOUJIAO: API_PREFIX + '/topNav/wuxiaobo/shouJiao',
    H5ACTIVITY_BASE_ADD: DEV_PREFIX + '/marketing/html',//h5活动页基础信息
    H5ACTIVITY_MODULE_ADD: DEV_PREFIX + '/marketing/html/module',//h5活动页模块信息
    H5ACTIVITY_LIST: DEV_PREFIX + '/marketing/html/paging',//h5活动页列表
    h5ACTIVITY_URL_ABSOLUTE: '/active',
    MODULESTORE_LIST: API_PREFIX + '/moduleStore/list',
    MODULE_PAGE: DEV_PREFIX + '/marketing/module/paging',//模块分页
    MODULE_ADD: DEV_PREFIX + '/marketing/module',//模块库添加
    COUPON_LIST: DEV_PREFIX + '/marketing/coupons/pagingsearch',//优惠券列表
    COUPON_ADD: DEV_PREFIX + '/marketing/coupon',//添加coupon
    COUPON_DISABLE_APPENDIX: '/setinvalid',//优惠券失效后缀
    COUPON_GET_LIST_APPENDIX: '/users/pagingsearch',//已领取列表
    PROMOTION_ADD: DEV_PREFIX + '/marketing/promotion',//促销信息
    PROMOTION_LIST: DEV_PREFIX + '/marketing/promotion/paging',//促销列表
    CATEGORY_TABLE_LIST: DEV_PREFIX + '/category/mains',//类目分页
    CATEGORY_SELECT_LIST: DEV_PREFIX + '/categories',//类目选择器
    CATEGORY_FIRST: DEV_PREFIX + '/category/main',//添加一级类目
    CATEGORY_SECOND: DEV_PREFIX + '/category/sub',//添加二级类目
    GOODS_PROP_LIST: DEV_PREFIX + '/attribute/items',//后去商品需要的属性项列表
    GOODS_PROP_KEY: DEV_PREFIX + '/attribute/item',//添加商品属性项
    GOODS_PROP_VALUE: DEV_PREFIX + '/attribute/value',//添加商品属性值
    UPLOAD_IMAGE: DEV_PREFIX + '/oss/token',//上传Token
    GOODS_DELIVERY_LIST: DEV_PREFIX + '/product/freight/paging',
    GOODS_DELIVERY_ADD: DEV_PREFIX + '/product/freight',//添加运费模板
    GOODS_DELIVERY_SELECT: DEV_PREFIX + '/product/freight/list',//运费模板select
    GOODS_LIST_REAL: DEV_PREFIX + '/products',//实物商品列表
    GOODS_LIST_COLUMN: DEV_PREFIX + '/product/column/paging',//专栏商品列表
    GOODS_LIST_CONTENT: DEV_PREFIX + '/product/content/paging',//内容商品列表
    GOODS_SELECT_COLUMN: DEV_PREFIX  + "/product/column/list",//专栏列表，用于内容商品关联专栏
    GOODS_SELECT_LABEL: DEV_PREFIX + '/labels',//获取标签列表
    GOODS_LABEL_LIST: DEV_PREFIX + '/labels/pagingsearch',
    GOODS_LABEL_ADD: DEV_PREFIX + '/label',
    GOODS_ADD_REAL: DEV_PREFIX + '/product',
    GOODS_ADD_COLUMN: DEV_PREFIX + '/product/column',//新建专栏商品
    GOODS_ADD_CONTENT: DEV_PREFIX + '/product/content',//新增内容商品
    GOODS_KEYWORD_LIST: DEV_PREFIX + '/product/search_keyword/paging',//热搜词列表
    GOODS_KEYWORD: DEV_PREFIX + '/product/search_keyword',
    GOODS_NEW_SPU: DEV_PREFIX + '/product/spu',
    GOODS_NEW_SKU: DEV_PREFIX + '/product/spu/sku',
    GOODS_PRODUCT_LIST: DEV_PREFIX + '/product/query/',//指定id列表，获取商品列表
    SUPPLIER_BASE: DEV_PREFIX + '/product/supplier',//供应商列表接口
    XiaoYa_SUPPLIER_BASE: DEV_PREFIX + '/product/supplier/xiaoya',//获取小亚供应商
    STORE_BASE: DEV_PREFIX + '/shop',//店铺装修
    USER_LIST: API_PREFIX + '/user/list',
    ADMIN_ROLE: DEV_PREFIX + '/admin/role', // 角色
    ADMIN_RULE: DEV_PREFIX + '/admin/rule', // 权限
    ADMIN_USER: DEV_PREFIX + '/admin/user', // 账号
    CATEGORY_NEW_BASE: DEV_PREFIX + '/product/category',//类目列表
    KIND_NEW_BASE: DEV_PREFIX + '/product/kind',//品类列表
    SPEC_NEW_BASE: DEV_PREFIX + '/product/category/template/spectemp',
    SPEC_ITEM_NEW_BASE: DEV_PREFIX + '/product/category/template/specitem',//规格属性项
    ATTR_NEW_BASE: DEV_PREFIX + '/product/category/template/attrtemp',
    ATTR_ITEM_NEW_BASE: DEV_PREFIX + '/product/category/template/attritem',//参数属性项
    MARKETING_FANTASTIC: DEV_PREFIX + '/marketing/meihao+/category_display',
    MARKETING_TODAY_MARKETING: DEV_PREFIX + '/marketing/daily/opblock',//今日 - 运营位
    MARKETING_TODAY_TOPIC: DEV_PREFIX + '/marketing/daily/topic',
    BRAND: DEV_PREFIX + '/product/brand',
    BRAND_HANDLE: DEV_PREFIX + '/product/brand/brand',
    SYSTEM_USER: DEV_PREFIX + '/user_internal',
    DISTRIBUTIONCHANNEL: DEV_PREFIX +'/marketing/channel',//分销渠道
    MEMBERSHIPCARD: DEV_PREFIX +'/marketing/member', //会员卡券
    COUPON: DEV_PREFIX + '/market/coupon/coupon',
    COUPON_LIST_V3: DEV_PREFIX + '/market/coupon/list',
    COUPON_DETAIL: DEV_PREFIX + '/market/coupon/detail',
    COUPON_BATCH: DEV_PREFIX + '/market/coupon/batch',
    COUPON_STATISTIC: DEV_PREFIX + '/market/coupon/turnover',//优惠券统计信息查询
    WECHAT_MESSAGE_PUSH_BASE: DEV_PREFIX + '/contact/wxtemplate',
    WECHAT_MESSAGE_PUSH_TYPE: DEV_PREFIX + '/contact/wxtemplate/type',//获取模板类型
    WECHAT_MESSAGE_PUSH_TEMPLATE: DEV_PREFIX + '/contact/wxtemplate/template',//某一条模板消息下的所有配置
  }
}
