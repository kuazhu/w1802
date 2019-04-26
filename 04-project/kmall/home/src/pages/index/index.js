/*
* @Author: TomChen
* @Date:   2019-04-23 19:24:03
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 19:07:44
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var keywordsTpl = require('./keywords.tpl')
var page = {
	keywords:[
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},	
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},								
	],
	init:function(){
		this.loadKeywords();
	},
	loadKeywords:function(){
		var html = _util.render(keywordsTpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	}
}
$(function(){
	page.init();
})