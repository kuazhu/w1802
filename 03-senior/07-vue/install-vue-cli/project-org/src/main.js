/*
* @Author: TomChen
* @Date:   2019-05-13 18:09:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-13 18:32:12
*/
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	render:h=>h(App)
}).$mount('#app')