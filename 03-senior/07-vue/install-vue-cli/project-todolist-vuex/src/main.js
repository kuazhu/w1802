/*
* @Author: TomChen
* @Date:   2019-05-13 18:09:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-13 20:48:22
*/
import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'

import store from './store'

Vue.config.productionTip = false

new Vue({
	store,
	render:h=>h(App)
}).$mount('#app')