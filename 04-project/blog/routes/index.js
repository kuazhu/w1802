/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-02 20:41:07
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')

const router = express.Router()

async function getCommonData(req){
	
	const categoriesPromise = CategoryModel.find({},'name').sort({order:-1});
	const pageArticlesPromise = ArticleModel.getPaginationArticles(req);
	
	const categories = await categoriesPromise;
	const pageArticles = await pageArticlesPromise;

	return {
		categories,
		pageArticles
	}
}


router.get("/",(req,res)=>{
	/*
	CategoryModel.find({},'name')
	.sort({order:-1})
	.then(categories=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories
		})		
	})
	*/
	getCommonData(req)
	.then(data=>{
		const {categories,pageArticles} = data;
		res.render('main/index',{
			userInfo:req.userInfo,
			categories,
			articles:pageArticles.docs,
			page:pageArticles.page,
			list:pageArticles.list,
			pages:pageArticles.pages,
			url:'/article'			
		})		
	})

})

module.exports = router