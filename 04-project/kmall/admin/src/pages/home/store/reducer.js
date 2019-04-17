/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-17 18:44:45
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	usernum:0,
	productnum:0,
	ordernum:0
})

export default (state=defaultState,action)=>{
	if(action.type == types.SET_COUNT){
		return state.merge({
			usernum:action.payload.usernum,
			productnum:action.payload.productnum,
			ordernum:action.payload.ordernum
		})
	}
	return state;
}