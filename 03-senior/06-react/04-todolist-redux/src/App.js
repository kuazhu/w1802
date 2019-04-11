/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 19:38:10
*/

import React,{ Component,Fragment } from 'react'
import { Input,Button,Row, Col,List  } from 'antd';

import store from  './store/index.js'

import './App.css'

class App extends Component{
	constructor(props){
		super(props);
		/*
		this.state = {
			list:["吃饭","睡觉"],
			val:''
		}
		*/

		//console.log(store)
		//console.log(store.getState())
		this.state = store.getState()
		
		store.subscribe(()=>{
			this.setState(()=>store.getState())
		});
		
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		/*
		this.setState(preState=>({
			list:[...preState.list,preState.val],
			val:''			
		}));
		*/
		const action = {
			type:'add_item'
		}
		store.dispatch(action)
	}
	handleChange(ev){
		const val = ev.target.value
		/*
		this.setState(()=>({
			val
		}));
		*/
		const action = {
			type:'change_item',
			payload:val
		}
		store.dispatch(action)
	}
	handleDel(index){
		/*
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState(()=>({
			list
		}));
		*/
		const action = {
			type:'del_item',
			payload:index
		}
		store.dispatch(action)
	}

	render(){
		return( 
			<div className="App">
				<Row>
					<Col span={12}>
						<Input 
							onChange={this.handleChange} 
							value={this.state.val}
						/>
					</Col>
					<Col span={12}>
						<Button type="primary" onClick={this.handleAdd}>新增</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:10}}
				  	bordered
				  	dataSource={this.state.list}
				  	renderItem={(item,index) => (<List.Item onClick={this.handleDel.bind(this,index)}>{item}</List.Item>)}
				/>				
			</div>
		)
	}
}

export default App