/*
* @Author: TomChen
* @Date:   2019-03-28 20:13:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-28 20:36:20
*/
const express = require('express');

const app = express();

const port = 3000

app.use(express.static('public'))
//app.use('/static', express.static('public'))

app.get('/', (req, res) => res.send('<h1>Hello World! 你好 跨猪</h1>'))

app.listen(port, () => console.log(`app listening on port ${port}!`))