/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 11:15:11
*/

import React,{ Component,Fragment } from 'react'

import { 
	BrowserRouter as Router, 
	// HashRouter as Router, 
	Route, 
	Link 
} from "react-router-dom";

import './App.css'

class Home extends Component{
	render(){
		return <h1>this is home page</h1>
	}
}
class User extends Component{
	render(){
		return <h1>this is users page</h1>
	}
}

class App extends Component{

	render(){
		return( 
			<Router>
				<div className="App">
					<ul className="nav">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">/about</Link>
						</li>
						<li>
							<Link to="/users">/users</Link>
						</li>						
					</ul>
					<Route exact path="/" component={Home} />				
					<Route path="/about" render={()=>(<h1>this about page</h1>)} />				
					<Route path="/users" component={User}  />				
				</div>
			</Router>
		)
	}
}


export default App;