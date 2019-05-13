/*
* @Author: TomChen
* @Date:   2019-05-13 20:42:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-13 20:47:40
*/
import Vue from 'vue'
import Vuex from 'vuex'

//生成store并且导出
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import state from './state.js'


Vue.use(Vuex);


export default new Vuex.Store({
	actions,
	mutations,
	getters,
	state
}) 