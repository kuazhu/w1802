/*
* @Author: TomChen
* @Date:   2019-03-27 18:39:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-28 18:17:03
*/
const mongoose = require('mongoose');
const moment = require('moment');


const UserModel = require('./models/user.js')
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');
	
	UserModel.findById('5c9c9c7f384468158f341760',(err,user)=>{
		if(err){
			console.log('find user err:',err)
		}else{
			//console.log(user.createdAt);
			//方法1.用Date类
			//const date = new Date(user.createdAt);
			//console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
			//方法2.用moment
			console.log(moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		}
	})
});