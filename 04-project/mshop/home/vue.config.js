/*
* @Author: TomChen
* @Date:   2019-05-14 19:45:21
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-14 19:45:36
*/
const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      	path.resolve(__dirname, './src/assets/less/index.less')
      ]
    }
  }
}