/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 15:54:33
*/

import React,{ Component,Fragment } from 'react'

import { 
	BrowserRouter as Router, 
	// HashRouter as Router, 
	Route, 
	Switch,
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
		return <Switch>
			<Route exact path="/users" render={()=><h1>this is users page,no id</h1>}  />
			<Route path="/users/profile" render={()=><h1>this is user profile page</h1>} />
			<Route path="/users/:id" render={(route)=><h1>this is users page,user id is {route.match.params.id}</h1>} />
		</Switch>
	}
}
class Info extends Component{
	render(){
		return <h1>this is info page</h1>
	}
}
class Login extends Component{
	render(){
		return <h1>this is login page</h1>
	}
}

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLogin:false
		}
	}
	render(){
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(this.state.isLogin ? <Component {...props} /> : <Login />)}
			 />
		)
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
							<Link to="/info">/info</Link>
						</li>						
						<li>
							<Link to="/users">/users</Link>
						</li>							
						<li>
							<Link to="/users/123">/users/123</Link>
						</li>
						<li>
							<Link to="/users/profile">/users/profile</Link>
						</li>												
					</ul>
					<Route exact path="/" component={Home} />				
					<Route path="/about" render={()=>(<h1>this about page</h1>)} />							
					<ProtectRoute path="/info" component={Info}  />	
					<ProtectRoute path="/users" component={User}  />

				</div>
			</Router>
		)
	}
}


export default App;