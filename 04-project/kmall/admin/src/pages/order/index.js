import React,{ Component } from 'react'
import { Route,Switch } from "react-router-dom"
import OrderDetail from './detail.js'
import OrderList from './list.js'


class Order extends Component{
    render(){
        return(
            <Switch>
                <Route path="/order/detail/:orderNo?" component={OrderDetail} />
                <Route path="/order/" component={OrderList} />
            </Switch>
        )
    }
}

export default Order