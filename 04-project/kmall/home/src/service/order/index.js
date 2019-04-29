/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 19:56:12
*/
var _util = require('util')

var _order = {
	getOrderProductList:function(success,error){
		_util.request({
			url:'/order/orderProductList',
			success:success,
			error:error			
		})		
	},			
}

module.exports = _order;