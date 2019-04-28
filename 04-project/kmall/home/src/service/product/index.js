/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 15:48:50
*/
var _util = require('util')

var _product = {
	getProductList:function(data,success,error){
		_util.request({
			url:'/product/home/list',
			data:data,
			success:success,
			error:error			
		})		
	},
	getProductDetail:function(data,success,error){
		_util.request({
			url:'/product/home/detail',
			data:data,
			success:success,
			error:error			
		})		
	},	
}

module.exports = _product;