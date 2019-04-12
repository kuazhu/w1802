/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 20:56:27
*/
import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,LOAD_DATA} from './actionTypes.js'
export const getAddItemAction = ()=>{
	return {
		type:ADD_ITEM
	}
}
export const getChangeItemAction = (payload)=>{
	return {
		type:CHANGE_ITEM,
		payload
	}
}
export const getDelItemAction = (payload)=>{
	return  {
		type:DEL_ITEM,
		payload
	}
}

export const loadInitDataAction = (payload)=>{
	return {
		type:LOAD_DATA,
		payload
	}
}


