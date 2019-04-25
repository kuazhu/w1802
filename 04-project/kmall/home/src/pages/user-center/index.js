/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-25 20:59:43
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var page = {
	init:function(){
		this.onload();
	},
	onload:function(){
		_side.render('user-center')
	}
}
$(function(){
	page.init();
})