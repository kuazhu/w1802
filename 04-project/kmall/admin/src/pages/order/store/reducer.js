/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 11:36:00
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isPageFetching:false,
	
	list:[],
	current:1,
	pageSize:0,
	total:0,
	keyword:'',

	order:{}
})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			keyword:action.payload.keyword || ''				
		})
	}
	if(action.type == types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type == types.SET_ORDER_DETAIL){
		return state.set('order',action.payload)
	}							
	return state;
}