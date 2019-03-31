/*
* @Author: TomChen
* @Date:   2019-03-28 20:13:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-29 18:18:30
*/
const express = require('express');

const app = express();

const port = 3000

app.use(express.static('public'))

/*
app.get('/users/:userId/books/:bookId', (req, res) => {
	console.log(req.params);//{ userId: '123', bookId: '888' }
	res.send('get response data...')
})
*/
app.get('/',(req,res)=>{
	console.log(req.query);//{ userId: '123', bookId: '888' }
	res.send('get response data...')
});


app.post('/', (req, res) => res.send('post response data...'))
app.put('/', (req, res) => res.send('put response data...'))
app.delete('/', (req, res) => res.send('delete response data...'))

app.listen(port, () => console.log(`app listening on port ${port}!`))