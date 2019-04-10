/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-09 20:51:42
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
	}
	handleAdd(){
		// console.log('add...')
		//this.state.list.push(this.state.val)
		this.setState({
			list:[...this.state.list,this.state.val],
			val:''
		})
	}
	handleChange(ev){
		// console.log(ev.target.value)
		//this.state.val = ev.target.value
		this.setState({
			val:ev.target.value
		})
	}
	handleDel(index){
		// console.log('del...',index)
		// this.state.list.splice(index,1)
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState({
			list
		})
	}
	render(){
		//return <div><input /> <button>新增</button></div>
		// return <Fragment><input /> <button>新增</button></Fragment>
		return( 
			//<div style={{background:'red'}}>
			<div className="App">
				<input onChange={this.handleChange.bind(this)} value={this.state.val} />
				<button onClick={this.handleAdd.bind(this)}>新增</button>
				<ul>
					{
						this.state.list.map((item,index)=>{
							/*
							return (
								<li 
									key={index}
									onClick={this.handleDel.bind(this,index)}
								>
								{item}
								</li>
							)
							*/
							// return <Item key={index} content={item} list={this.state.list} index={index} />
							return <Item key={index} content={item} handleDel={this.handleDel.bind(this,index)} />
						})
					}
				</ul>
			</div>
		)
	}
}

export default App