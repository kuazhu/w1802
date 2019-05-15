/*
* @Author: TomChen
* @Date:   2019-05-13 20:42:57
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-15 18:36:17
*/
import {
	GET_HOME_PRODUCTS
} from './types.js'

export default {
	[GET_HOME_PRODUCTS](state,payload){
		state.homeProducts = payload.homeProducts
	}	
}