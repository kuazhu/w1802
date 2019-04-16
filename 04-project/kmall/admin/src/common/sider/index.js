/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-16 20:21:38
*/

import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Layout, Menu, Icon,
} from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

import './index.css'

class AdminSider extends Component{
    render(){
        return (
        	<div className="AdminSider">
			  <Sider width={200} style={{ background: '#fff' }}>
			    <Menu
			      mode="inline"
			      style={{ minHeight: 880, borderRight: 0 }}
			    >
			        <Menu.Item key="1">
			        	<NavLink exact to="/"><Icon type="home" />首页</NavLink>
			        </Menu.Item>
			        <Menu.Item key="2">
			        	<NavLink to="/user"><Icon type="user" />用户管理</NavLink>
			        </Menu.Item>
			        <Menu.Item key="3">
			        	<NavLink to="/category"><Icon type="bars" />分类管理</NavLink>
			        </Menu.Item>
			        <Menu.Item key="4">
			        	<NavLink to="/product"><Icon type="book" />商品管理</NavLink>
			        </Menu.Item>
			        <Menu.Item key="5">
			        	<NavLink to="/order"><Icon type="coffee" />订单管理</NavLink>
			        </Menu.Item>			        				        			        
			    </Menu>
			  </Sider>
        	</div>
        )
    }
}


export default AdminSider