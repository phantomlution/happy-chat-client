// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var type = process.argv[2]&&process.argv[2].slice(1),
    target = process.argv[3];

// if(type === 't'&&!target) {
//     console.error('测试服务器host不能为空，请重新启动命令: npm run test xx.xx.xx.xx:port');
//
// }
target = target || '';
target = target.indexOf('http') > -1 ? target : 'http://' + target;

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: './',
    productionSourceMap: false,
    dllDirectory: path.join(path.resolve(__dirname, '../build'), 'dll'),
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 4020,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/wechat': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/wechat': '/wechat'
      //   }
      // },
      // '/test': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/test': '/test'
      //   }{}
      // },
      '/api': {
        // target: 'http://localhost:3003',//mock
        // target: 'http://192.168.31.75:9000',//JY
        target: 'http://mall-manage-system-dev.cf59cac1496034299bb3c15b64ab3993b.cn-hangzhou.alicontainer.com',
        // target: 'https://mall-manage.imeihao.shop',
        // target: 'http://192.168.210.206:9000',// cc
        // target: 'http://192.168.210.235:9005',//my
        // target: 'http://192.168.210.225:9005',//sz
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
