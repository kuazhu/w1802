/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 19:54:41
*/

import React,{ Component,Fragment } from 'react'
import TodoList from './pages/todolist'

class App extends Component{

	render(){
		return( 
			<div className="App">
				<TodoList />			
			</div>
		)
	}
}


export default App;