/*
* @Author: TomChen
* @Date:   2019-03-28 20:13:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-29 18:40:23
*/
const express = require('express');
// const userRouter = require('./routers/user.js')
// const blogRouter = require('./routers/blog.js')

const app = express();

const port = 3000

app.use(express.static('public'))

// app.use('/user',userRouter)
// app.use('/blog',blogRouter)
// 
app.use('/user',require('./routers/user.js'))
app.use('/blog',require('./routers/blog.js'))

app.listen(port, () => console.log(`app listening on port ${port}!`))