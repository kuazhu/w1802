/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-23 18:47:00
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	images:'',
	detail:'',
	description:'',
	name: '',
	price: '',
	stock: '',

	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',	
	
	isSaveFetching:false,
	isPageFetching:false,
	
	list:[],
	current:1,
	pageSize:0,
	total:0,
	keyword:'',
})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			keyword:action.payload.keyword || ''				
		})
	}
	if(action.type == types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	
	if(action.type == types.SET_CATEGORY_ID){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
			categoryIdHelp:''			
		})
	}
	if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:''
		})
	}
	if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	if(action .type == types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择商品分类!'
		})
	}
	if(action .type == types.SET_IMAGES_ERROR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请选择商品图片!'
		})
	}
	if(action.type == types.SAVE_REQUEST){
		return state.set('isSaveFetching',true)
	}
	if(action.type == types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}
	if(action.type == types.SET_PRODUCT_DETAIL){
		return state.merge({
			parentCategoryId:action.payload.category.pid,
			categoryId:action.payload.category._id,
			images:action.payload.images,
			detail:action.payload.detail,
			description:action.payload.description,
			name: action.payload.name,
			price: action.payload.price,
			stock: action.payload.stock,		
		})
	}							
	return state;
}