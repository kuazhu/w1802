/*
* @Author: TomChen
* @Date:   2019-03-27 18:39:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-28 19:35:43
*/
const mongoose = require('mongoose');
const UserModel = require('./models/user.js')
const BlogModel = require('./models/blog.js')
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');
	//需求:找博文的标题是"title1"的第一篇文章的所有信息(包括博文的信息和作者的信息)
	/*
	BlogModel.findOne({title:"title1"},(err,blog)=>{
		if(err){
			console.log('find blog err::',err);
		}else{
			//console.log(blog);
			const result = {
				blog:blog
			};
			UserModel.findById(blog.author,(err,user)=>{
				if(err){
					console.log('find user err::',err)
				}else{
					result.user = user;
					console.log(result)
				}
			})

		}
	})
	*/
	/*
	BlogModel.findOne({title:"title1"})
	.populate('author','name age -_id')
	.then(result=>{
		console.log(result);
	})
	*/
	BlogModel.findBlog({title:"title1"})
	.then(result=>{
		console.log(result);
	})




});