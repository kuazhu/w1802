/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-03 20:53:15
*/
const express = require('express')
const CommentModel = require('../models/comment.js')
const router = express.Router()

//验证登录用户
router.use((req,res,next)=>{
	if(req.userInfo){
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
		res.json({
			status:0,
			data:comments
		})		
	})
})


module.exports = router