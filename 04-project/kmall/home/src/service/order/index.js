/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 10:29:17
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
	createOrder:function(data,success,error){
		_util.request({
			url:'/order',
			method:'post',
			data:data,
			success:success,
			error:error			
		})			
	},
	getOrderList:function(data,success,error){
		_util.request({
			url:'/order/home/list',
			data:data,
			success:success,
			error:error			
		})			
	},
	getOrder:function(data,success,error){
		_util.request({
			url:'/order/home/detail',
			data:data,
			success:success,
			error:error			
		})			
	},
	cancelOrder:function(data,success,error){
		_util.request({
			url:'/order/cancel',
			method:'put',
			data:data,
			success:success,
			error:error			
		})			
	},		
}

module.exports = _order;