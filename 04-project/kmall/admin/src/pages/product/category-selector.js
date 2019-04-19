/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-19 20:53:34
*/

import React,{ Component } from 'react'
import { Select } from 'antd';

import { request } from 'util'
import { GET_CATEGORIES } from 'api'

const Option = Select.Option;
class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state={
			levelOneCategories:[],
			levelOneId:'',
			levelTwoCategories:[],
			levelTwoId:''
		}
		this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategories();
	}
	loadLevelOneCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState(()=>({levelOneCategories:result.data}))
			}
		})
	}
	handleLevelOneChange(value){
		this.setState(()=>({levelOneId:value,levelTwoId:''}),()=>{
			this.loadLevelTowCategories()
			this.onValueChange()
		})
	}
	loadLevelTowCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneId
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState(()=>({levelTwoCategories:result.data}))
			}
		})
	}
	handleLevelTwoChange(value){
		this.setState(()=>({levelTwoId:value}),()=>{
			this.onValueChange()
		})
	}	
	onValueChange(){
		const { getCategoryId } = this.props
		const { levelOneId,levelTwoId} = this.state
		if(levelTwoId){
			getCategoryId(levelOneId,levelTwoId)
		}else{
			getCategoryId(0,levelOneId)
		}
		
	}
    render(){
    	const { levelOneCategories,levelTwoCategories,levelOneId,levelTwoId } = this.state;
    	const levelOneOptions = levelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    	const levelTwoOptions = levelTwoCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        return (
        	<div className="CategorySelector">
        		<Select 
        			style={{width:200,marginRight:10}}
        			onChange={this.handleLevelOneChange}
        			value={levelOneId}
        		>
        			{levelOneOptions}
        		</Select>
        		{
        			levelTwoOptions.length
        			?<Select 
        				style={{width:200}}
        				onChange={this.handleLevelTwoChange}
        				value={levelTwoId}
        			 >
        				{levelTwoOptions}
        			</Select>
        			: null 
        		}

        	</div>
        )
    }
}

export default CategorySelector