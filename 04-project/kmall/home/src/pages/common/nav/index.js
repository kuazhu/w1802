/*
* @Author: TomChen
* @Date:   2019-04-24 18:17:34
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-24 19:31:31
*/
require('./index.css')
var _user = require('service/user')
var nav = {
	init:function(){
		this.bindEvent();
		return this;
	},
	bindEvent:function(){
		//1.绑定退出事件
		$('#logout').on('click',function(){
			_user.logout(function(result){
				console.log(result)
			},function(msg){
				alert(msg)
			})
		})
	}
}

module.exports = nav.init();