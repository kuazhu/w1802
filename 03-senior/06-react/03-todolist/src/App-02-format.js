/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-10 18:16:26
*/

import React,{ Component,Fragment } from 'react'
import Item from './Item.js'
import './App.css'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:["吃饭","睡觉","敲代码"],
			val:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		/*
		this.setState({
			list:[...this.state.list,this.state.val],
			val:''
		})
		*/
		/*
		this.setState(()=>{
			return {
				list:[...this.state.list,this.state.val],
				val:''
			}
		})
		*/
		/*
		this.setState((preState)=>{
			return {
				list:[...preState.list,preState.val],
				val:''
			}
		})
		*/
		this.setState(preState=>({
			list:[...preState.list,preState.val],
			val:''			
		}));
	}
	handleChange(ev){
		// console.log(ev.target.value)
		//this.state.val = ev.target.value
		/*
		this.setState({
			val:ev.target.value
		})
		*/
		const val = ev.target.value
		this.setState(()=>({
			val
		}));
	}
	handleDel(index){
		// console.log('del...',index)
		// this.state.list.splice(index,1)
		const list = [...this.state.list]
		list.splice(index,1)
		/*
		this.setState({
			list
		})
		*/
		this.setState(()=>({
			list
		}));
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return <Item key={index} content={item} handleDel={this.handleDel.bind(this,index)} />
		})
	}
	render(){
		return( 
			<div className="App">
				<input onChange={this.handleChange} value={this.state.val} />
				<button onClick={this.handleAdd}>新增</button>
				<ul>
					{
						this.getItems()
					}
				</ul>
			</div>
		)
	}
}

export default App