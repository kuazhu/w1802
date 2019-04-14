/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-02 20:31:53
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
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

//显示文章列表
router.get("/",(req,res)=>{
	/*
	const options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1},
		populates:[{path:"user",select:'username'},{path:'category',select:'name'}]
	}
	pagination(options)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})		
	})
	*/
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})		
	})		
})

//显示添加文章页面
router.get("/add",(req,res)=>{
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		res.render('admin/article_add_edit',{
			userInfo:req.userInfo,
			categories
		})
	})
})
//处理添加文章
router.post("/add",(req,res)=>{
	const { category,title,intro,content } = req.body;
	ArticleModel.insertMany({
		title,
		category,
		intro,
		content,
		user:req.userInfo._id
	})
	.then(article=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'添加文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"添加文章失败,操作数据库错误,稍后再试一试"
		})
	})
})

//显示编辑页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				article,
				categories
			})		
		})		
	})
})

//处理编辑
router.post('/edit',(req,res)=>{
	const { id,category,title,intro,content } = req.body;
	ArticleModel.updateOne({_id:id},{category,title,intro,content})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'修改文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"修改文章失败,操作数据库错误,稍后再试一试"
		})		
	})
})

//删除
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params
	ArticleModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除文章成功',
			url:'/article'
		})	
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"删除文章失败,操作数据库错误,稍后再试一试"
		})		
	})	
})
module.exports = router