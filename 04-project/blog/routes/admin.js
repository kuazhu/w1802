/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-02 19:19:50
*/
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const UserModel = require('../models/user.js')
const pagination = require('../util/pagination.js')
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

//显示用户列表
router.get("/users",(req,res)=>{
	/*
	分页:
	约定:每一页显示 2 条 limit(2) limit = 2
	
	第 1 页 跳过 0 条 skip(0)
	第 2 页 跳过 2 条 skip(2)
	第 3 页 跳过 4 条 skip(4)

	第 page 页 跳过 （page -1）* limit 条 skip(（page -1）* limit)

	 */
	/* 
	let { page } = req.query;
	const limit = 2;

	page = parseInt(page)

	if(isNaN(page)){
		page = 1;
	}

	if(page ==0){
		page = 1;
	}

	UserModel.countDocuments({})
	.then(count=>{
		//计算总页数
		const pages = Math.ceil(count / limit)
		if(page > pages){
			page = pages
		}
		//生成页码数组
		const list = [];
		for(let i = 1;i<=pages;i++){
			list.push(i)
		}

		//每页显示条数
		const skip = (page -1) * limit

		UserModel.find({},'-password -__v')
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users,
				page,
				list
			})			
		})
	})
	*/
	const options = {
		page:req.query.page,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})		
	})
})

//处理上传图片
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadedFilePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})

module.exports = router