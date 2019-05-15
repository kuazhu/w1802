var express = require('express');
var path = require('path');

var products = require('./routes/products');

var app = express();

//跨域设置
app.use((req,res,next)=>{
	res.append("Access-Control-Allow-Origin","*");
	res.append("Access-Control-Allow-Credentials",true);
	res.append("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,X-File-Name"); 
	next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', products);

module.exports = app;
