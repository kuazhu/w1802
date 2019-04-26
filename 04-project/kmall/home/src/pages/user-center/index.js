/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 18:14:59
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(user){
			var html = _util.render(tpl,{
				user:user
			})
			$('.side-content').html(html)
		})
	}
}
$(function(){
	page.init();
})