/**
 * 角色管理路由
 */
import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Modal, Form, Input, message, Tree } from 'antd'
import { PAGE_SIZE } from '../../utils/constant'
import { reqRoles, reqAddRoles,reqUpdateRoles,reqDelRoles } from '../../api'
import {formateDate} from '../../utils/dateUtils'

function Role() {
    const [dataSource, setDataSource] = useState([])//table数据源
    const [role, setRole] = useState([]) //选中的role
    const [buttonShow, setButtonShow] = useState(false) //设置角色权限按钮是否可选
    const [loading, setLoading] = useState(false)//table加载状态
    const [isShow, setIsShow] = useState(false) //添加角色对话框是否显示
    const [isShowAuth, setIsShowAuth] = useState(false) //权限控制对话框是否显示
    const [checked,setChecked] = useState([]) //权限树选中的对应url地址
    const [form] = Form.useForm()  //获取当前页面的form
    useEffect(() => {
        //获取角色列表数据
        loadData()
        //获取角色权限列表数据
    }, [])
    // const rowSelection = {}
    const loadData = async () => {
        setLoading(true)
        const result = await reqRoles()
        // console.log(result);
        if (result.data.status === 0) {
            setDataSource(result.data.data)
            setLoading(false)
        } else {
            message.error('获取角色列表数据失败')
            
        }
    }
    //表格列
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render:(create_time)=>formateDate(create_time)
            
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render:formateDate
        },
        {
            title: '授权人',
            dataIndex: 'auth_name'
        },
        {
            title:'操作',
            render:(record)=>{
            return <Button type="danger" onClick={()=>delRole(record._id)}>删除</Button>
            }
        }
    ]
    //权限树
    const treeData = [
        {
            title: '平台权限',
            key: '0-0',
            children: [
                {
                    title: '首页',
                    key: '/home',
                    
                },
                {
                    title: '商品',
                    key: '/products:',
                    children: [
                        {
                            title: (
                                <span
                                    style={{
                                        color: '#1890ff',
                                    }}
                                >
                                    品类管理
                                </span>
                            ),
                            key: '/products:/category',
                        },
                        {
                            title: '商品管理',
                            key: '/products:/product',
                        },
                    ],
                },
                {
                    title: '用户管理',
                    key: '/user'
                },
                {
                    title: '角色管理',
                    key: '/role'
                },
                {
                    title: '图形图表',
                    key: '/charts:',
                    children: [
                        {
                            title: '柱状图',
                            key: '/charts:/bar'
                        },
                        {
                            title: '折线图',
                            key: '/charts:/line'
                        },
                        {
                            title: '饼图',
                            key: '/charts:/pie'
                        }
                    ]
                },
            ],
        },
    ];
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        setChecked(checkedKeys)
        
        console.log('onCheck', checkedKeys, info);
    };
    const delRole = async (role_id)=>{
        console.log(role_id);
        const result = await reqDelRoles(role_id)
        if(result.data.status===0){
            message.success("删除角色成功")
            loadData()
        }
    }
    const addRoleHandleOk = async () => {
        setIsShow(false)//model框消失
        try {
            const values = await form.validateFields();
            console.log('success', values)
            //调用接口 添加角色
            const result = await reqAddRoles(values.roleName)

            if (result.data.status === 0) {
                loadData()
                form.resetFields()
            }
        } catch (errorInfo) {
            console.log('err' + errorInfo);
        }
    }
    //设置角色权限对话框ok事件
    const settingHandleOk = () => {
        setIsShowAuth(false)    //关闭权限对话框
        setRole(role,...role.menus=checked) // 修改role 选项从状态数据中得到
        console.log(checked);
        console.log(role);
        //调用更新角色api
        reqUpdateRoles(role).then(res=>{
            console.log(res);
            if(res.data.status===0){
                message.success('更新角色权限成功')
            }
        
        }).catch(err=>{
            console.log(err)
        })
        loadData()


    }
    //表格单击事件
    const onRow = (record) => {
        return {
            onClick: event => {
                //点击了表格某行
                console.log(record);
                //当前选中角色
                setRole(record)
                //权限按钮显示
                setButtonShow(true)
            }
        }
    }
    //Card的title
    const title = (
        <div>
            <Button
                type="primary"
                style={{ margin: "0 10px" }}
                onClick={() => setIsShow(true)}>
                创建角色
                </Button>
            <Button
                type="primary"
                disabled={!buttonShow}
                onClick={() => setIsShowAuth(true)}>
                设置角色权限
                </Button>
        </div>
    )

    return (
        <Card title={title}>
            <Table
                bordered
                rowKey={record => record._id}
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                pagination={{ defaultPageSize: PAGE_SIZE }}
                rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }} //表格行是否可选择
                onRow={onRow}
            >

            </Table>
            <Modal
                title="添加角色"
                visible={isShow}
                destroyOnClose={() => { return true }}
                onOk={addRoleHandleOk}
                onCancel={() => {
                    setIsShow(false)
                    form.resetFields()
                }}
                style={{ textAlign: "center" }}
            >
                <Form

                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="角色名称"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '请输入角色名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
            <Modal
                title="设置角色权限"
                visible={isShowAuth}
                //关闭时销毁modal里的子元素
                destroyOnClose={() => { return true }}
                onOk={settingHandleOk}
                onCancel={() => {
                    setIsShowAuth(false)

                }}
                style={{ textAlign: "center" }}
            >
                <Form
                    name="auth"
                    form={form}
                >
                    <Form.Item label="角色名称">
                        <Input value={role.name} disabled></Input>
                    </Form.Item>
                </Form>
                <Tree
                    checkable
                    draggable='true'
                    //默认展开所有的树节点
                    defaultExpandAll='true'
                    
                    // checkedKeys={role.menu}
                 
                    defaultSelectedKeys={role.menus}
                    defaultCheckedKeys={role.menus}
                    onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={treeData}
                />
            </Modal>
        </Card>
    )
}

export default Role
