/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 18:57:58
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')
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
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		_side.render('user-update-password')
	},	
	bindEvent:function(){
		var _this = this;
		$('#btn-submit').on('click',function(){
			_this.submitUpdatePassword();
		})
		$('.side-content input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitUpdatePassword();
			}
		})			
	},
	submitUpdatePassword:function(){
		//1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2.验证数据
		var validateResult = this.validate(formData)
		//3.发送请求
		if(validateResult.status){//验证通过
			formErr.hide()
			_user.updatePassword(formData,function(){
				window.location.href = './result.html?type=updatePassword'
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
		//两次密码不一致
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致'
			return result;			
		}					
		result.status = true;
		return result;

	}
}
$(function(){
	page.init();
})