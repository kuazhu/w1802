/*
* @Author: TomChen
* @Date:   2019-05-13 18:09:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-14 20:11:27
*/
import Vue from 'vue'
import App from './App.vue'

import './assets/css/common.css'
import 'font-awesome/css/font-awesome.min.css' 

import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render:h=>h(App)
}).$mount('#app')