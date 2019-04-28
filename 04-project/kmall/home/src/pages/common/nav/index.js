/*
* @Author: TomChen
* @Date:   2019-04-24 18:17:34
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 16:58:15
*/
require('./index.css')
var _user = require('service/user')
var _cart = require('service/cart')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		this.loadCartCount();
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
	},
	loadUsername:function(){
		_user.getUsername(function(data){
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(data.username)
		})
	},
	loadCartCount:function(){
		_cart.getCartCount(function(count){
			$('.nav-list .cart-num').text(count || 0)
		},function(){
			$('.nav-list .cart-num').text(0)
		})
	}
}

module.exports = nav.init();