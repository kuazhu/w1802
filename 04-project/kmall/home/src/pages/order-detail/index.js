/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 09:17:23
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var tpl = require('./index.tpl')
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || '',
	},	
	init:function(){
		this.$elem = $('.order-box');
		this.onload();
		this.loadOrderDetail();
	},
	onload:function(){
		_side.render('order-list')
	},
	loadOrderDetail:function(){
		var _this = this;
	}
}
$(function(){
	page.init();
})