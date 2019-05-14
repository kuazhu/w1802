/*
* @Author: TomChen
* @Date:   2019-05-14 19:29:36
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-14 20:12:08
*/
//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import Me from '../pages/Me/Me'

//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/cart",component:Cart},
		{path:"/me",component:Me},
		{path:"/",redirect:"/home"},
	]
})