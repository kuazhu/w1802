/*
* @Author: TomChen
* @Date:   2019-04-16 18:14:09
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-16 18:22:24
*/

import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
        	method:options.method || 'get',	
			url:options.url || '',
			data:options.data || ''
		}
		axios(params)
		.then(result=>{
			resolve(result.data);
		})
		.catch(err=>{
			reject(err)
		})
	})
}