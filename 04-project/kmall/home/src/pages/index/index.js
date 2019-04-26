/*
* @Author: TomChen
* @Date:   2019-04-23 19:24:03
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 20:06:19
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
var floorTpl = require('./floor.tpl')
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
	floor:[
		{
			title:'F1 家用电器',
			item:[
				{image:require('images/floor/floor01-01.jpg'),text:'冰箱洗衣机',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor01-02.jpg'),text:'热水器',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor01-03.jpg'),text:'平板电视',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor01-04.jpg'),text:'空调',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor01-05.jpg'),text:'智能影音',categoryId:'5b84b36c50f099037f316c64'},
			]
		},	
		{
			title:'F2 智能数码',
			item:[
				{image:require('images/floor/floor02-01.jpg'),text:'相机频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor02-02.jpg'),text:'智能频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor02-03.jpg'),text:'单反相机',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor02-04.jpg'),text:'平衡车',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor02-05.jpg'),text:'汽车用品',categoryId:'5b84b36c50f099037f316c64'},
			]
		},
		{
			title:'F3 生活家电',
			item:[
				{image:require('images/floor/floor03-01.jpg'),text:'生活家电',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor03-02.jpg'),text:'日用家纺',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor03-03.jpg'),text:'厨具频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor03-04.jpg'),text:'个护健康',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/floor/floor03-05.jpg'),text:'卫浴馆',categoryId:'5b84b36c50f099037f316c64'},
			]
		},					
	],
	init:function(){
		this.loadKeywords();
		this.loadSwiper();
		this.loadFloor();
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
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		})
		$('.floor-wrap').html(html)
	}
}
$(function(){
	page.init();
})