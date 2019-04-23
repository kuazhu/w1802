/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-23 18:49:27
*/
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { 
	SAVE_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT_ORDER,
	UPDATE_PRODUCT_STATUS,
	GET_PRODUCT_DETAIL,
	SEARCH_PRODUCTS, 
} from 'api'

export const getSetCategoryIdAction = (pid,id)=>{
	return {
		type:types.SET_CATEGORY_ID,
		payload:{
			parentCategoryId:pid,
			categoryId:id
		}
	}	
}
export const getSetImagesAction = (payload)=>{
	return {
		type:types.SET_IMAGES,
		payload
	}	
}
export const getSetDetailAction = (payload)=>{
	return {
		type:types.SET_DETAIL,
		payload
	}	
}

const setCategoryError=()=>{
	return {
		type:types.SET_CATEGORY_ERROR
	}	
}
const setImagesError=()=>{
	return {
		type:types.SET_IMAGES_ERROR
	}	
}
const getSaveRequestAction = ()=>{
	return {
		type:types.SAVE_REQUEST
	}
}
const getSaveDoneAction = ()=>{
	return {
		type:types.SAVE_DONE
	}
}
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		const category = state.get('categoryId');
		const images = state.get('images');
		const detail = state.get('detail');
		let hasError = false;
		if(err){
			hasError = true;
		}
		if(!category){
			dispatch(setCategoryError())
			hasError = true;
		}
		if(!images){
			dispatch(setImagesError())
			hasError = true;			
		}
		if(hasError){
			return;
		}
		let method = 'post'
		if(values.id){
			method = 'put'
		}
		dispatch(getSaveRequestAction())
		request({
			method:method,
			url:SAVE_PRODUCT,
			data:{
				...values,
				category,
				images,
				detail
			}
		})
		.then(result=>{
			if(result.code == 0){
				window.location.href="/product"
			}else{
				message.error(result.message)
			}
		})
		.finally(()=>{
			dispatch(getSaveDoneAction())
		})
	}	
}


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
			url:GET_PRODUCTS,
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

export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		request({
			method:'put',
			url:UPDATE_PRODUCT_ORDER,
			data:{
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新排序成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}

export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		request({
			method:'put',
			url:UPDATE_PRODUCT_STATUS,
			data:{
				id:id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新状态成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}
const setProductDetailAction = (payload)=>{
	return {
		type:types.SET_PRODUCT_DETAIL,
		payload
	}
} 
export const getProductDetailAction = (productId)=>{
	return (dispatch,getState)=>{
		request({
			url:GET_PRODUCT_DETAIL,
			data:{
				id:productId,
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setProductDetailAction(result.data))
			}
		})
	}	
}

export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			url:SEARCH_PRODUCTS,
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






