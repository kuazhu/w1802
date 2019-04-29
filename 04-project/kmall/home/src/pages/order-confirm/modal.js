/*
* @Author: TomChen
* @Date:   2019-04-29 20:21:56
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 20:51:14
*/

var _util = require('util')
var _cities = require('util/cities')
var modalTpl = require('./modal.tpl')
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
var _modal = {
	show:function(){
		this.$modalBox = $('.modal-box')
		this.loadModal();
		this.bindEvent();
	},
	loadModal:function(){
		var html = _util.render(modalTpl);
		this.$modalBox.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		var provincesOptions = this.getSelectOptions(provinces);
		var $provincesSelect = $('.province-select');
		$provincesSelect.html(provincesOptions)

	},
	loadCities:function(provinceName){
		var cities = _cities.getCities(provinceName)
		var citiesOptions = this.getSelectOptions(cities);
		var $citiesSelect = $('.city-select');
		$citiesSelect.html(citiesOptions)
	},
	getSelectOptions:function(arr){
		var html = '<option value="">请选择</option>';
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html;
	},
	hideModal:function(){
		this.$modalBox.empty();
	},
	bindEvent:function(){
		var _this = this;
		//1.关闭弹出框
		this.$modalBox.on('click','.close',function(){
			_this.hideModal();
		})
		//阻止冒泡
		this.$modalBox.on('click','.modal-container',function(ev){
			ev.stopPropagation();
		})
		//2.监听省份事件获取城市
		this.$modalBox.on('change','.province-select',function(){
			var $this = $(this);
			_this.loadCities($this.val())
		})



		$('#btn-submit').on('click',function(){
			_this.submit();
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2.验证数据
		var validateResult = this.validate(formData)
		//3.发送请求
		if(validateResult.status){//验证通过
			formErr.hide()
			_user.register(formData,function(){
				window.location.href = './result.html?type=register'
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
		//两次密码不一致
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致'
			return result;			
		}
		//手机号码不能为空
		if(!_util.validate(formData.phone,'require')){
			result.msg = '手机号码不能为空'
			return result;
		}
		//手机号码格式不正确
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号码格式不正确'
			return result;
		}
		//邮箱不能为空
		if(!_util.validate(formData.email,'require')){
			result.msg = '邮箱不能为空'
			return result;
		}
		//邮箱格式不正确
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result;
		}						
		result.status = true;
		return result;

	}
}

module.exports = _modal