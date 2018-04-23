const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  node: {
    'fs': 'empty'
  },
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'api': path.resolve(__dirname, '../src/constants/apiConstants.js'),//api 地址
      'apiUtils': path.resolve(__dirname, '../src/utils/apiUtils.js'),//http 工具类
      'validator': path.resolve(__dirname, '../src/utils/validatorUtils.js'),//表单自定义验证规则
      'pageUtils': path.resolve(__dirname, '../src/utils/pageUtils.js'),//分页adaptor
      'loadingUtils': path.resolve(__dirname, '../src/utils/loadingUtils.js'),//页面显示加载中的遮罩
      'stringUtils': path.resolve(__dirname, '../src/utils/stringUtils'),//字符串工具类
      'enum': path.resolve(__dirname, '../src/constants/enumConstants'),
      'action': path.resolve(__dirname, '../src/store/actionType'),//所有的action
      'excel': path.resolve(__dirname, '../src/utils/excelUtils'),//excel导出
      'compute': path.resolve(__dirname, '../src/utils/compute'),
      'dateUtils': path.resolve(__dirname, '../src/utils/dateUtils'),//日期工具类
      'actionType': path.resolve(__dirname, '../src/store/actionType.js'),
      'mutationType': path.resolve(__dirname, '../src/store/mutationType.js')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        resolve('src'),
        resolve('node_modules/element-ui/src')
      ],
    }, {
      test: /\.css$/,
      loader: "css-loader",
    }, {
      test: /\.less$/,
      loader: 'less-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 20000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
    ]
  }
};
