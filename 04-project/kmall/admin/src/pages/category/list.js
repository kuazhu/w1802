/*
 * @Author: TomChen
 * @Date:   2019-04-09 19:29:30
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-04-19 18:34:33
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Table, InputNumber, Divider } from 'antd'
import { Link } from "react-router-dom"
import { actionCreator } from './store'
import Layout from 'common/layout'


class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: this.props.match.params.pid || 0
        }
    }
    componentDidUpdate(preProps, preState) {
        const oldPath = preProps.location.pathname;
        const newPath = this.props.location.pathname;
        if (oldPath != newPath) {
            const newPid = this.props.match.params.pid || 0;
            this.setState(() => ({ pid: newPid }), () => {
                this.props.handlePage(newPid, 1)
            })
        }
    }
    componentDidMount() {
        this.props.handlePage(this.state.pid, 1);
    }
    render() {
        const { 
            list, 
            current, 
            pageSize, 
            total, 
            handlePage, 
            isPageFetching,
            handleOrder, 
        } = this.props;
        const { pid } = this.state
        const dataSource = list.map(category => {
            return {
                key: category.get('_id'),
                id: category.get('_id'),
                name: category.get('name'),
                order: category.get('order'),
                pid:category.get('pid')
            }
        }).toJS()
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
            render: (order,record) => <InputNumber 
                    defaultValue={order} 
                    onBlur={(ev)=>{
                        handleOrder(record.pid,record.id,ev.target.value)
                    }}
                />
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                  <a href="javascript:;">修改名称</a>
                  {
                    pid == 0
                    ?<span>
                        <Divider type="vertical" />
                        <Link to={"/category/"+record.id} >查看子分类</Link>                    
                     </span>
                    : null    
                  }
                </span>
            ),
        }];
        return (
            <div className="CategoryList">
            <Layout>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                <Breadcrumb.Item>分类列表</Breadcrumb.Item>
              </Breadcrumb>
              <div className="clearfix">
                <h4 style={{float:'left'}}>父级分类ID:{pid}</h4>
                <Link style={{float:'right'}} to="/category/add">
                    <Button  type="primary" >添加分类</Button>
                </Link>
              </div>
              <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{
                        current:current,
                        pageSize:pageSize,
                        total:total
                    }}
                    onChange={(page)=>{
                        handlePage(pid,page.current)
                    }}
                    loading={{
                        spinning:isPageFetching,
                        tip:'正在加载数据'
                    }}
                />                          
            </Layout>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.get('category').get('list'),
        current: state.get('category').get('current'),
        pageSize: state.get('category').get('pageSize'),
        total: state.get('category').get('total'),
        isPageFetching: state.get('category').get('isPageFetching'),
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        handlePage: (pid, page) => {
            const action = actionCreator.getPageAction(pid, page)
            dispath(action)
        },
        handleOrder:(pid,id,newOrder)=>{
            const action = actionCreator.getOrderAction(pid,id,newOrder)
            dispath(action)            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)