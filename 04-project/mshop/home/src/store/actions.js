/*
* @Author: TomChen
* @Date:   2019-05-13 20:42:57
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-15 18:35:59
*/
import {
	GET_HOME_PRODUCTS
} from './types.js'

import {
	getHomeProducts
} from '../api'

export default {
	async [GET_HOME_PRODUCTS]({commit}){
		const products = await getHomeProducts()
		commit(GET_HOME_PRODUCTS,{homeProducts:products})
	}
}