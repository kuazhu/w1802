/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-10 20:15:57
*/

import React,{ Component,Fragment } from 'react'
import Item from './Item.js'
import './App.css'

class App extends Component{
	constructor(props){
		console.log('App constructor')
		super(props);
		this.state = {
			list:["吃饭"],
			val:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}

	static getDerivedStateFromProps(nextProps, prevState){
		console.log('App getDerivedStateFromProps(nextProps, prevState)',nextProps, prevState)
		return {
		
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log('App shouldComponentUpdate(nextProps, nextState)',nextProps, nextState)
		// return false;
		return true;
	}
	getSnapshotBeforeUpdate(prevProps, prevState){
		console.log('App getSnapshotBeforeUpdate(prevProps, prevState)',prevProps, prevState)
		return 123;
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		console.log('App componentDidUpdate(prevProps, prevState,snapshot)',prevProps, prevState,snapshot)
	}
	handleAdd(){
		this.setState(preState=>({
			list:[...preState.list,preState.val],
			val:''			
		}));
	}
	handleChange(ev){
		const val = ev.target.value
		this.setState(()=>({
			val
		}));
	}
	handleDel(index){
		const list = [...this.state.list]
		list.splice(index,1)
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
		console.log('App render....')
		return( 
			<div className="App">
				<input 
					onChange={this.handleChange} 
					value={this.state.val}
				/>
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