/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 19:29:46
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){

	},
	bindEvent:function(){
		var _this = this;							
	}

}
$(function(){
	page.init();
})