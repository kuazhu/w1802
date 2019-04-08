/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 19:02:34
*/
const express = require('express')
const CommentModel = require('../models/comment.js')
const router = express.Router()

//验证登录用户
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			status:10,
			message:'用户未登录'
		})
	}
})

router.post("/add",(req,res)=>{
	const {  content,article } = req.body
	CommentModel.insertMany({
		content,
		article,
		user:req.userInfo._id
	})
	.then(comments=>{
		CommentModel.getPaginationComments(req,{article})
		.then(data=>{
			res.json({
				status:0,
				data
			})
		})	
	})
})
//处理评论数据的ajax请求
router.get('/list',(req,res)=>{
	const { id } = req.query;
	const query = {};
	if(id){
		query.article = id
	}
	CommentModel.getPaginationComments(req,query)
	.then(data=>{
		res.json({
			status:0,
			data
		})
	})
})

module.exports = router