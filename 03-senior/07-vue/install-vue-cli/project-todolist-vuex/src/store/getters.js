/*
* @Author: TomChen
* @Date:   2019-05-13 20:42:57
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-14 18:49:21
*/
//state的计算属性
export default {
	total(state){
		return state.todos.length
	},
	totalDone(state){
		return state.todos.reduce((total,item)=>{
			if(item.done){
				total++
			}
			return total
		},0)
		
	},
	allDone(state,getter){
		return (getter.total == getter.totalDone) && (getter.total != 0)
	}	
}