/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 14:41:16
*/
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { 
	GET_ORDERS,
	GET_ORDER_DETAIL,
	SEARCH_ORDERS,
	UPDATE_ORDER_DELIVER 
} from 'api'

const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}

export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			url:GET_ORDERS,
			data:{
				page:page
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}


const setOrderDetailAction = (payload)=>{
	return {
		type:types.SET_ORDER_DETAIL,
		payload
	}
} 
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch,getState)=>{
		request({
			url:GET_ORDER_DETAIL,
			data:{
				orderNo:orderNo,
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setOrderDetailAction(result.data))
			}
		})
	}	
}

export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			url:SEARCH_ORDERS,
			data:{
				keyword:keyword,
				page:page
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
	}
}
export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch,getState)=>{
		request({
			url:UPDATE_ORDER_DELIVER,
			method:'put',
			data:{
				orderNo:orderNo,
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setOrderDetailAction(result.data))
			}
		})
	}	
}






