/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-15 20:07:29
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as todolistReducer  } from '../pages/todolist/store'

//1.引入login组件自己的reducer,相当于引用 '../pages/login/store/index.js'
//2.为了避免命名冲突,对引入的reducer重命名
import { reducer as loginReducer  } from '../pages/login/store'

export default combineReducers({
	todolist:todolistReducer,
	//3.属性login就是合并和整个顶层数据(state)的一个属性,值loginReducer就是该属性的值
	//4.所以在获取值的时候需要从顶层的state中先获取'login',再获取里面的值(参考 /src/pages/login/index.js中的mapStateToProps方法) 
	login:loginReducer
})