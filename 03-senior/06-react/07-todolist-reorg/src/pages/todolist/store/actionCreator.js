/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'
import axios from 'axios';
export const getAddItemAction = ()=>{
	return {
		type:types.ADD_ITEM
	}
}
export const getChangeItemAction = (payload)=>{
	return {
		type:types.CHANGE_ITEM,
		payload
	}
}
export const getDelItemAction = (payload)=>{
	return  {
		type:types.DEL_ITEM,
		payload
	}
}

export const loadInitDataAction = (payload)=>{
	return {
		type:types.LOAD_DATA,
		payload
	}
}

export const getInitDataAction = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000/')
		.then(result=>{
			const action = loadInitDataAction(result.data);
			dispatch(action)
		})
	}
}


