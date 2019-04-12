/*
* @Author: TomChen
* @Date:   2019-04-11 20:45:48
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 20:54:19
*/
const http = require('http')


const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.end(JSON.stringify(["learn react","learn nodejs"]))
})

server.listen('3000','127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})