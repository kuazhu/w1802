/*
* @Author: TomChen
* @Date:   2019-03-28 20:13:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-29 19:03:38
*/
const express = require('express');

const app = express();

const port = 3000

app.use((req,res,next)=>{
	console.log("A1")
	next()
	console.log('A2')
})
app.use((req,res,next)=>{
	console.log("B1")
	next()
	console.log('B2')
})
app.use((req,res,next)=>{
	console.log("C1")
	next()
	console.log('C2')
})


app.get('/', (req, res) => {
	res.send('<h1>Hello World! 你好 跨猪</h1>')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))