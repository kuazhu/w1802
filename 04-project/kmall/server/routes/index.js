/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 18:30:53
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const CommentModel = require('../models/comment.js')

const router = express.Router()

async function getCommonData(){
	
	const categoriesPromise = CategoryModel.find({},'name').sort({order:-1});
	const topArticlesPromise = ArticleModel.find({},'_id click title').sort({click:-1}).limit(10)

	const categories = await categoriesPromise;
	const topArticles = await topArticlesPromise

	return {
		categories,
		topArticles
	}
}
//显示首页
router.get("/",(req,res)=>{
	getCommonData()
	.then(data=>{
		const {categories,topArticles} = data;
		ArticleModel.getPaginationArticles(req)
		.then(pageArticles=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//首页文章分页数据
				articles:pageArticles.docs,
				page:pageArticles.page,
				list:pageArticles.list,
				pages:pageArticles.pages,		
			})			
		})
		
	})
})
//处理文章数据的ajax请求
router.get('/articles',(req,res)=>{
	const { id } = req.query;
	const query = {};
	if(id){
		query.category = id
	}
	ArticleModel.getPaginationArticles(req,query)
	.then(data=>{
		res.json({
			status:0,
			data
		})
	})
})

async function getDetailData(req){
	const {id} = req.params
	const commonDataPromise = getCommonData();
	const articleDataPromise = 	ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
								.populate({path:"user",select:'username'})
								.populate({path:'category',select:'name'});
	const commentPageDataPromise = CommentModel.getPaginationComments(req,{article:id})

	const data = await commonDataPromise;
	const article = await articleDataPromise;
	const pageData = await commentPageDataPromise;

	const {categories,topArticles} = data;


	return {
		categories,
		topArticles,
		article,
		pageData
	}
}


//详情页
router.get('/view/:id',(req,res)=>{
	
	getDetailData(req)
	.then(data=>{
		const {categories,topArticles,article,pageData} = data;
			res.render('main/detail',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				article,
				//回传分类id,为了详情页对应导航选中
				category:article.category._id,
				//评论的分页数据
				comments:pageData.docs,
				page:pageData.page,
				list:pageData.list,
				pages:pageData.pages,				
			})
	})
})
//列表页
router.get('/list/:id',(req,res)=>{
	const {id} = req.params
	getCommonData()
	.then(data=>{
		const {categories,topArticles} = data;
		ArticleModel.getPaginationArticles(req,{category:id})
		.then(pageArticles=>{
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//首页文章分页数据
				articles:pageArticles.docs,
				page:pageArticles.page,
				list:pageArticles.list,
				pages:pageArticles.pages,
				//回传分类id
				category:id
			})			
		})
	})
})




module.exports = router