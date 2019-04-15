/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-15 19:00:56
*/

import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";


import Login from './pages/login'
import Home from './pages/home'

import './App.css'


class App extends Component{

	render(){
		return( 
			<Router>
				<div className="App">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
				</div>
			</Router>
		)
	}
}


export default App;