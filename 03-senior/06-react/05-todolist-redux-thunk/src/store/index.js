/*
* @Author: TomChen
* @Date:   2019-04-11 18:50:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 19:58:47
*/
import { createStore } from 'redux'
import reducer from './reducer.js'

//1.store是负责整个数据的管理(获取最新的state,派发action,监听state的改变)
//2.整个应用只有一个store
//3.创建store时第一个参数需要传入一个函数(reducer)

const store = createStore(reducer)

export default store