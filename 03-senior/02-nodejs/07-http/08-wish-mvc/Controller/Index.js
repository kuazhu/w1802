/*
* @Author: TomChen
* @Date:   2019-03-25 19:39:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-25 19:41:01
*/
class Index{
	index(req,res,...args){
		res.setHeader('Content-Type',"text/html;charset=utf-8");
		res.end('<a href="/Wish/index">去许愿</a>')
	}
}

module.exports = new Index();