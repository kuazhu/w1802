/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-25 19:43:30
*/
require('pages/common/footer')
require('pages/common/logo')
require('./index.css')
var _util = require('util')

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';
	$('.'+type).show()
})