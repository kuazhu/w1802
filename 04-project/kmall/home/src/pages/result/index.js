/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-30 20:21:53
*/
require('pages/common/footer')
require('pages/common/logo')
require('./index.css')
var _util = require('util')

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';
	if(type == 'payment'){
		var orderNo = _util.getParamFromUrl('orderNo')
		var $elem = $('.btn-order-detail');
		var href = $elem.attr('href') + orderNo;
		$elem.attr('href',href)
	}
	$('.'+type).show()
})