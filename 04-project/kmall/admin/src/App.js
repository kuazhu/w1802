/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 17:17:05
*/

import React,{ Component,Fragment } from 'react'
import Login from './pages/login'

import './App.css'


class App extends Component{

	render(){
		return( 
			<div className="App">
				<Login />
			</div>
		)
	}
}


export default App;