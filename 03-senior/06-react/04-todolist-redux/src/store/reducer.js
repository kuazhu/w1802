/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 19:39:00
*/
const defaultState = {
	list:["吃饭","睡觉"],
	val:'打豆豆'
}
export default (state=defaultState,action)=>{

	if(action.type == 'change_item'){
		/*
		不推荐使用
		state.val = action.payload
		return state
		*/
		
		//1.copy上一次的state
		const newState = JSON.parse(JSON.stringify(state))
		//2.修改新的state再返回
		newState.val = action.payload
		return newState;
	}	

	if(action.type == 'add_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.val)
		newState.val = ''
		return newState
	}
	if(action.type == 'del_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
	}


	return state;
}