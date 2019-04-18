/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-18 20:57:02
*/
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES } from 'api'

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
			console.log(err)
			message.success('添加分类失败')
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
			console.log(result)
			dispatch(setLevelOneCategoriesAction(result.data))
		})
	}	
}





