/*
 * @Author: TomChen
 * @Date:   2019-04-09 19:29:30
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-04-21 17:02:01
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Form,
    Input,
    Breadcrumb,
    InputNumber,
    Row,
    Col,
    Button,
} from 'antd';

import CategorySelector from './category-selector.js'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'

import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api'
import { actionCreator } from './store'

import Layout from 'common/layout'


class ProductSave extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.handleSave(err,values)
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            handleCategoryId,
            handleImages,
            handleDetail,
            categoryIdValidateStatus,
            categoryIdHelp,
            imagesValidateStatus,
            imagesHelp,
            isSaveFetching
        } = this.props
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className="ProductSave">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>添加商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form {...formItemLayout}>
                        <Form.Item label="商品名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入商品名称!' }],
                          })(
                            <Input placeholder="商品名称" />
                          )}
                        </Form.Item>
                        <Form.Item label="商品描述">
                          {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入商品描述!' }],
                          })(
                            <Input placeholder="商品描述" />
                          )}
                        </Form.Item>
                        <Form.Item 
                            label="商品分类"
                            required={true}
                            validateStatus={categoryIdValidateStatus}
                            help={categoryIdHelp}
                        >
                            <CategorySelector getCategoryId={(pid,id)=>{
                                handleCategoryId(pid,id)
                            }} />
                        </Form.Item>
                        <Form.Item label="商品价格">
                          {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格!' }],
                          })(
                            <InputNumber  
                                min={0}
                            />
                          )}
                        </Form.Item>
                        <Form.Item label="商品库存">
                          {getFieldDecorator('stock', {
                            rules: [{ required: true, message: '请输入商品库存!' }],
                          })(
                            <InputNumber  
                                min={0}
                            />
                          )}
                        </Form.Item>
                        <Form.Item 
                            label="商品图片"
                            required={true}
                            validateStatus={imagesValidateStatus}
                            help={imagesHelp}                            
                        >
                            <UploadImage 
                                action={UPLOAD_PRODUCT_IMAGE}
                                max={3}
                                getFileList={(fileList)=>{
                                    handleImages(fileList)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="商品描述">
                            <RichEditor 
                                url={UPLOAD_PRODUCT_DETAIL_IMAGE}
                                getRichEditorValue={(value)=>{
                                    handleDetail(value)
                                }}
                            />
                        </Form.Item>                                                                                                                                                                     
                        <Form.Item {...tailFormItemLayout}>
                          <Button 
                            type="primary"
                            onClick={this.handleSubmit}
                            loading={isSaveFetching}
                          >
                            提交
                          </Button>
                        </Form.Item>
                    </Form>                  
                </Layout>
            </div>
        )
    }
}
const WrappedProductSave = Form.create()(ProductSave);

const mapStateToProps = (state) => {
    return {
        categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
        categoryIdHelp:state.get('product').get('categoryIdHelp'),
        imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
        imagesHelp:state.get('product').get('imagesHelp'),        
        isSaveFetching:state.get('product').get('isSaveFetching'),        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleCategoryId:(pid,id)=>{
            const action = actionCreator.getSetCategoryIdAction(pid,id)
            dispatch(action)   
        },
        handleImages:(fileList)=>{
            const action = actionCreator.getSetImagesAction(fileList)
            dispatch(action)   
        },
        handleDetail:(value)=>{
            const action = actionCreator.getSetDetailAction(value)
            dispatch(action)   
        },
        handleSave:(err,values)=>{
            const action = actionCreator.getSaveAction(err,values)
            dispatch(action)              
        }                
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProductSave)