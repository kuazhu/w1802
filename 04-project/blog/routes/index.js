/*
* @Author: TomChen
* @Date:   2019-03-31 11:06:49
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-31 15:40:04
*/
const express = require('express')

const router = express.Router()

router.get("/",(req,res)=>{
	res.render('main/index',{
		userInfo:req.userInfo
	})
})

module.exports = router