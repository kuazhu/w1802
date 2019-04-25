/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-25 19:16:54
*/
var _util = require('util')

var _user = {
	logout:function(success,error){
		_util.request({
			url:'/user/logout',
			success:success,
			error:error			
		})		
	},
	login:function(data,success,error){
		_util.request({
			method:'post',
			url:'/user/login',
			data:data,
			success:success,
			error:error
		})

	},
	register:function(data,success,error){
		_util.request({
			method:'post',
			url:'/user/register',
			data:data,
			success:success,
			error:error
		})

	},	
	getUsername:function(success,error){
		_util.request({
			url:'/user/username',
			success:success,
			error:error			
		})	
	},
	checkUsername:function(username,success,error){
		_util.request({
			url:'/user/checkUsername',
			data:{
				username:username
			},
			success:success,
			error:error			
		})		
	}
}

module.exports = _user;