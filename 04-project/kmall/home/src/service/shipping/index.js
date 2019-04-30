/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-30 19:12:07
*/
var _util = require('util')

var _shipping = {
	addShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			method:'post',
			data:data,
			success:success,
			error:error			
		})		
	},
	editShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			method:'put',
			data:data,
			success:success,
			error:error			
		})		
	},
	getShippingList:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error			
		})		
	},
	getShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			data:data,
			success:success,
			error:error			
		})		
	},	
	deleteShipping:function(data,success,error){
		_util.request({
			url:'/shipping/delete',
			method:'put',
			data:data,
			success:success,
			error:error			
		})			
	}				
}

module.exports = _shipping;