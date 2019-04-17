/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-17 19:18:21
*/
import * as types from './actionTypes.js'
import { request } from 'util'
import { ADMIN_COUNT } from 'api'


const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}

export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNT
		})
		.then(result=>{
			if(result.code == 0){
				const action = setCountAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}


