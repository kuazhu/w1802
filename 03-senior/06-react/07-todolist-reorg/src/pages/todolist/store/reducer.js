/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:47
*/
import * as types from './actionTypes.js'

const defaultState = {
	list:["吃饭","睡觉"],
	val:'打豆豆'
}
//1. reducer是一个函数
//2. reducer是一个纯函数(固定的输入就有固定的输出)
//3. reducer的主要作用是负责业务逻辑处理,生成新的state,由store来最终改变

export default (state=defaultState,action)=>{

	if(action.type == types.CHANGE_ITEM){
		/*
		不推荐使用
		state.val = action.payload
		return state
		*/
		
		//1.copy上一次的state
		const newState = JSON.parse(JSON.stringify(state))
		//2.修改新的state再返回
		/*
			 不是纯函数的例子
			 newState.val = action.payload + Date.now
			 newState.val = action.payload + Math.random()
		 */
		newState.val = action.payload
		return newState;
	}	

	if(action.type == types.ADD_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.val)
		newState.val = ''
		return newState
	}
	if(action.type == types.DEL_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
	}
	if(action.type == types.LOAD_DATA){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.payload
		return newState
	}

	return state;
}