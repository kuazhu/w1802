/*
* @Author: TomChen
* @Date:   2019-03-28 20:13:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-29 18:27:00
*/
const express = require('express');

const app = express();

const port = 3000

app.use(express.static('public'))

app.get('/',(req,res)=>{
	//res.send({name:"Tom"})
	//res.send('<h1>get response data...</h1>')
	//res.send('get response data...')
	
	//res.end({name:"Tom"})
	//res.end('<h1>get response data...</h1>')
	//res.end('get response data...')
	
	res.json({name:"Tom"})
});


app.post('/', (req, res) => res.send('post response data...'))
app.put('/', (req, res) => res.send('put response data...'))
app.delete('/', (req, res) => res.send('delete response data...'))

app.listen(port, () => console.log(`app listening on port ${port}!`))