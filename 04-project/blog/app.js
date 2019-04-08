/*
* @Author: TomChen
* @Date:   2019-03-29 19:32:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 19:40:15
*/
const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

const app = express();
const port = 3000

//1.连接数据库服务
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');	
});

app.use(express.static('public'))

//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})

//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

//post/put请求处理中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/*
//设置cookie中间件
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res)
	
	req.userInfo = {}
	
	let userInfo = req.cookies.get('userInfo');
	
	if(userInfo){
		req.userInfo = JSON.parse(userInfo);
	}
	next()
})
*/

//设置session中间件
app.use(session({
	//设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true, 
    //强制将未初始化的session存储
    saveUninitialized: true,
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24}, 
    // cookie:{maxAge:1000*10},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })                
}))
app.use((req,res,next)=>{
	
	req.userInfo = req.session.userInfo || {};
	
	next()
})
app.use('/',require('./routes/index.js'))
app.use('/user',require('./routes/user.js'))
app.use('/admin',require('./routes/admin.js'))
app.use('/home',require('./routes/home.js'))
app.use('/category',require('./routes/category.js'))
app.use('/article',require('./routes/article.js'))
app.use('/comment',require('./routes/comment.js'))

app.listen(port, () => console.log(`app listening on port ${port}!`))