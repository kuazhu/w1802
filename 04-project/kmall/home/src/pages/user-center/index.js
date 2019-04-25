/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-25 20:19:19
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){

	}
}
$(function(){
	page.init();
})