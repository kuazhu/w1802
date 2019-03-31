/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-31 17:22:47
*/
const express = require('express')
const UserModel = require('../models/user.js')
const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>')
	}
})

//显示后台首页
router.get("/",(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

router.get("/users",(req,res)=>{
	UserModel.find({},'-password -__v')
	.then(users=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users
		})			
	})
})

module.exports = router