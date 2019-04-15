/*
* @Author: TomChen
* @Date:   2019-04-12 20:04:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-15 20:02:00
*/
//1.这个reducer就是login组件自己的reducer

import reducer from './reducer.js'
import * as actionCreator from './actionCreator.js'

//2.把login组件自己的reducer导出
export { reducer,actionCreator }