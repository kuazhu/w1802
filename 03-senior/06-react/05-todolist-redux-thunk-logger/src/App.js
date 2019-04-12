/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 18:11:38
*/

import React,{ Component,Fragment } from 'react'
import { Input,Button,Row, Col,List  } from 'antd';
import store from  './store/index.js'
import {getAddItemAction,getChangeItemAction,getDelItemAction,loadInitDataAction,getInitDataAction} from './store/actionCreator.js'

import AppUI from './AppUI.js'

//容器组件
class App extends Component{
	constructor(props){
		super(props);
	
		//初始化时获取store中的数据
		this.state = store.getState()
		//当store中的数据发生变化时触发
		store.subscribe(()=>{
			//获取store中的最新数据来更新当前组件的state数据
			this.setState(()=>store.getState())
		});
		
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)
	}
	componentDidMount(){
		/*
		axios
		.get('http://127.0.0.1:3000/')
		.then(result=>{
			const action = loadInitDataAction(result.data);
			store.dispatch(action)
		})
		*/
		const action = getInitDataAction();
		store.dispatch(action)

	}
	handleAdd(){
		const action = getAddItemAction();
		store.dispatch(action)
	}
	handleChange(ev){
		const val = ev.target.value
		const action = getChangeItemAction(val)
		store.dispatch(action)
	}
	handleDel(index){
		const action = getDelItemAction(index)
		store.dispatch(action)
	}

	render(){
		return( 
			<AppUI
				handleChange={this.handleChange}
				val={this.state.val}
				handleAdd={this.handleAdd}
				list={this.state.list}
				handleDel={this.handleDel}
			 />
		)
	}
}

export default App