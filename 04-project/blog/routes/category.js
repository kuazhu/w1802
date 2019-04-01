/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-01 19:02:33
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>')
	}
})

//显示分类列表
router.get("/",(req,res)=>{
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
})

//显示添加分类页面
router.get("/add",(req,res)=>{
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})
//处理添加分类
router.post("/add",(req,res)=>{
	
	const { name,order } = req.body;
	CategoryModel.findOne({name})
	.then(category=>{
		if(category){//已经存在同名的分类

		}else{
			CategoryModel.insertMany({name,order})
			.then(categories=>{
	
			})
			.catch(err=>{
				throw err
			})			
		}
	})
	.catch(err=>{

	})


})



module.exports = router