const webpack = require('webpack');
const path = require('path');
const packageJsonFile = require('../package.json');
const rm = require('rimraf');
const config = require('../config');

const excludeList = [//you do not want to include at the dll file
  "vue-socket.io",
  "vue2-editor",
  "element-ui"//使用dll库打包，el-tooltip组件异常
];

const dependencyList = Object.keys(packageJsonFile.dependencies);

var vendorList = dependencyList.filter(function(item){
  return excludeList.indexOf(item) == -1;
});

rm(config.build.dllDirectory, function(err){
  if(err) throw err;
});

module.exports = {
  entry: {
    vendor: vendorList
  },
  output: {
    filename: '[name].[hash].dll.js',
    path: config.build.dllDirectory,
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.DllPlugin({
      context: config.build.dllDirectory,
      name: '[name]_[hash]',
      path: path.join(config.build.dllDirectory, 'manifest.json')
    })
  ]
}
