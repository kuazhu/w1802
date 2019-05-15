/*
* @Author: TomChen
* @Date:   2019-05-13 18:09:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-15 18:42:08
*/
import Vue from 'vue'
import App from './App.vue'

import './assets/css/common.css'
import 'font-awesome/css/font-awesome.min.css' 

import store from './store'
import router from './router'
import filters  from './filters'

Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render:h=>h(App)
}).$mount('#app')