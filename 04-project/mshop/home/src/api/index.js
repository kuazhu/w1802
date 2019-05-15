/*
* @Author: TomChen
* @Date:   2019-05-14 19:28:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-15 18:20:09
*/
import axios from 'axios';

const SERVER = 'http://127.0.0.1:3000'

export const getHomeProducts = ()=>{
	return axios({
		url:SERVER+"/products/homeProducts"
	})
	.then(result=>{
		if(result.data.code == 0){
			return result.data.data
		}else{
			throw 'no data'
		}
	})
	.catch(err=>{
		console.log(err)
	})
}