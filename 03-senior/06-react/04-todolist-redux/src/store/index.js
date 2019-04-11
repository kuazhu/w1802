/*
* @Author: TomChen
* @Date:   2019-04-11 18:50:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 18:56:58
*/
import { createStore } from 'redux'
import reducer from './reducer.js'

const store = createStore(reducer)

export default store