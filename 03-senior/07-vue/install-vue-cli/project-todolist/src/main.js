/*
* @Author: TomChen
* @Date:   2019-05-13 18:09:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-13 18:49:42
*/
import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'

Vue.config.productionTip = false

new Vue({
	render:h=>h(App)
}).$mount('#app')