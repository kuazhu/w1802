/*
* @Author: TomChen
* @Date:   2019-04-23 19:24:03
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 19:40:13
*/
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var keywordsTpl = require('./keywords.tpl')
var swiperTpl = require('./swiper.tpl')
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
	swiper:[
		{image:require('images/carousel/carousel-01.jpg'),categoryId:'111'},
		{image:require('images/carousel/carousel-02.jpg'),categoryId:'222'},
		{image:require('images/carousel/carousel-03.jpg'),categoryId:'333'},
	],
	init:function(){
		this.loadKeywords();
		this.loadSwiper();
	},
	loadKeywords:function(){
		var html = _util.render(keywordsTpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	},
	loadSwiper:function(){
		var html = _util.render(swiperTpl,{
			swiper:this.swiper
		});
		$('.swiper-container').html(html)
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true, // 循环模式选项
			autoplay:{
				delay:3000
			},
			// 如果需要分页器
			pagination: {
			  el: '.swiper-pagination',
			  clickable:true
			},
			// 如果需要前进后退按钮
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
		})
	}
}
$(function(){
	page.init();
})