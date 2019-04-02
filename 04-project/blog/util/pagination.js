/*
* @Author: TomChen
* @Date:   2019-04-01 19:26:42
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-02 20:15:12
*/
/*
page:请求页码
model:数据模型
query:查询条件
projection:投影
sort:排序
populates:关联的数组
*/
async function pagination(options){
	/*
	分页:
	约定:每一页显示 2 条 limit(2) limit = 2
	
	第 1 页 跳过 0 条 skip(0)
	第 2 页 跳过 2 条 skip(2)
	第 3 页 跳过 4 条 skip(4)

	第 page 页 跳过 （page -1）* limit 条 skip(（page -1）* limit)

	*/
	let { page,model,query,projection,sort,populates } = options;
	const limit = 2;

	page = parseInt(page)

	if(isNaN(page)){
		page = 1;
	}

	if(page ==0){
		page = 1;
	}

	const count = await model.countDocuments(query);

	//计算总页数
	const pages = Math.ceil(count / limit)

	if(page > pages){
		page = pages
	}
	//如果总页数是0
	if(pages == 0){
		page = 1;
	}
	
	//生成页码数组
	const list = [];
	for(let i = 1;i<=pages;i++){
		list.push(i)
	}

	//跳过条数
	const skip = (page -1) * limit

	let result = model.find(query,projection);
	if(populates){
		populates.forEach(populate=>{
			result = result.populate(populate);
		})
	}

	const docs = await result.sort(sort).skip(skip).limit(limit)

	return {
		docs,
		page,
		list,
		pages		
	}

}


module.exports = pagination