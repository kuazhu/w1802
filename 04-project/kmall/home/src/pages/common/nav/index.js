/*
* @Author: TomChen
* @Date:   2019-04-24 18:17:34
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-24 19:52:14
*/
require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		return this;
	},
	bindEvent:function(){
		//1.绑定退出事件
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	}
}

module.exports = nav.init();