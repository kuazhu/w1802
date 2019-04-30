/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-30 20:14:34
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _payment = require('service/payment')
var tpl = require('./index.tpl')
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || ''
	},
	init:function(){
		this.$elem = $('.payment-box');
		this.loadPaymentInfo();
	},
	loadPaymentInfo:function(){
		var _this = this;
		if(this.params.orderNo){
			_payment.getPaymentInfo({orderNo:this.params.orderNo},function(payment){
				var html = _util.render(tpl,payment)
				_this.$elem.html(html)
				_this.listenPaymentStatus();
			},function(msmg){
				_this.$elem.html('<p class="empty-msg">获取支付信息失败,请稍后再试!</p>')	
			});
		}
	},
	listenPaymentStatus:function(){
		var _this = this;
		setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if(result){
					window.location.href = './result.html?type=payment&orderNo='+_this.params.orderNo
				}
			})
		},1000)
	}
}
$(function(){
	page.init();
})