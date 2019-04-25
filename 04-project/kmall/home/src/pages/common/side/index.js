/*
* @Author: TomChen
* @Date:   2019-04-25 20:34:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-25 20:56:41
*/
require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')
var _side = {
	list:[
		{name:'user-center',href:'./user-center.html',desc:'用户中心'},
		{name:'order-list',href:'./order-list.html',desc:'我的订单'},
		{name:'user-update-password',href:'./user-update-password.html',desc:'修改密码'},
	],
	render:function(name){
		this.list.find(function(item){
			return item.name == name
		}).isActive = true

		var html = _util.render(tpl,{
			list:this.list
		})
		$('.side').html(html)
	}
}

module.exports = _side;