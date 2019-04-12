/*
* @Author: TomChen
* @Date:   2019-04-11 18:50:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 18:40:35
*/
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer.js'

//1.store是负责整个数据的管理(获取最新的state,派发action,监听state的改变)
//2.整个应用只有一个store
//3.创建store时第一个参数需要传入一个函数(reducer)

// const store = createStore(reducer)

// console.log(process.env.NODE_ENV)
const middleware = [thunk]

if(process.env.NODE_ENV != 'production'){
	const logger = createLogger({});
	middleware.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middleware))

export default store