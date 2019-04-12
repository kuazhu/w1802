/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:08:05
*/
import { combineReducers } from 'redux'
import { reducer as todolistReducer  } from '../pages/todolist/store'

export default combineReducers({
	todolist:todolistReducer
})