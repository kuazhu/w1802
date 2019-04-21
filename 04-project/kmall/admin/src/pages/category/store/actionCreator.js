/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-21 15:38:19
*/
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES,UPDATE_CATEGORY_ORDER,UPDATE_CATEGORY_NAME } from 'api'

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
const getAddRequestAction = ()=>{
	return {
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return {
		type:types.ADD_DONE
	}
}
const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
const setLevelOneCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEVEL_ONE_CATEGORIES,
		payload
	}
}
export const getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			url:GET_CATEGORIES,
			data:{
				page:page,
				pid:pid
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
export const getAddAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORY,
			data:values
		})
		.then(result=>{
			if(result.code == 0){
				if(result.data){
					dispatch(setLevelOneCategoriesAction(result.data))
				}
				message.success('添加分类成功')
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('添加分类失败')
		})
		.finally(()=>{
			dispatch(getAddDoneAction())
		})
	}	
}
export const getLevelOneCategoriesAction = ()=>{
	return (dispatch)=>{
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			dispatch(setLevelOneCategoriesAction(result.data))
		})
	}	
}
export const getUpdateOrderAction = (pid,id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_ORDER,
			data:{
				pid:pid,
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

export const getShowUpdateNameModalAction = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_NAME_MODAL,
		payload:{
			updateId,
			updateName
		}
	}	
}
export const getCloseUpdateNameModalAction = ()=>{
	return {
		type:types.CLOSE_UPDATE_NAME_MODAL
	}	
}
export const getUpdateNameChangeAction = (payload)=>{
	return {
		type:types.UPDATE_NAME_CHANGE,
		payload
	}	
}
export const getUpdateNameAction = (pid)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_NAME,
			data:{
				pid:pid,
				id:state.get('updateId'),
				name:state.get('updateName'),
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新名称成功')
				dispatch(getCloseUpdateNameModalAction());
				dispatch(setPageAction(result.data))
			}
		})
	}	
}





