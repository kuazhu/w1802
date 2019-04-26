/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 18:20:26
*/
require('pages/common/footer')
require('pages/common/logo')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')		
	}
}
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//1.用户登录
		$('#btn-submit').on('click',function(){
			_this.submitLogin();
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitLogin();
			}
		})
	},
	submitLogin:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData)
		//3.发送请求
		if(validateResult.status){//验证通过
			formErr.hide()
			_user.login(formData,function(){
				window.location.href = _util.getParamFromUrl('redirect') || "/"
			},function(msg){
				formErr.show(msg)
			})
		}
		else{//验证失败
			formErr.show(validateResult.msg)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空'
			return result;
		}
		//用户名格式不正确
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确'
			return result;
		}
		//密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空'
			return result;
		}
		//密码格式不正确
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result;
		}		
		result.status = true;
		return result;

	}
}
$(function(){
	page.init();
})