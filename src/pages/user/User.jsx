/**
 * 用户路由
 */
import React, { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, Form, Input, Select, message } from 'antd'
import { reqAddUser, reqDelUser, reqUser,reqUpdateUser } from '../../api/index'
import {formateDate} from '../../utils/dateUtils'
const { Option } = Select;
function User() {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title: '操作',
            render: (txt, record, index) => {
                return (<div style={{ float: "left", marginLeft: "10%", width: "80%" }}>
                    <Button
                        style={{
                            float: "left",
                            marginLeft: "2.5%",
                            width: "30%"
                        }}
                        onClick={()=>modifyUser(record)}
                    >修改
                    </Button>
                    <Button
                        type="danger"
                        style={{
                            float: "left",
                            marginLeft: "2.5%",
                            width: "30%"
                        }}
                        onClick={()=>{delUser(record._id)}}
                    >
                        删除
                     </Button>
                </div>
                )
            }
        }
    ]
   
    const selectAfter = (
        <Select defaultValue="@qq.com" className="select-after">
            <Option value="@qq.com">@qq.com</Option>
            <Option value="@163.com">@163.com</Option>

        </Select>
    );
    const [isShow, setIsShow] = useState(false); //控制modal显示
    const [roles, setRoles] = useState([]) //角色数组
    const [users, setUsers] = useState([]) //用户数组
    const [title, setTitle] = useState([]) //创建用户与修改用户的title
    const [updataUserId,setUpdataUserId] = useState("") //当前修改用户的_id
    const [form] = Form.useForm()
    useEffect(() => {
        //调用请求所有用户api
        loadUser()
    }, [])

    const loadUser = () => {
        reqUser()
            .then(res => {
                console.log(res);
                if (res.data.status === 0) {
                    setUsers(res.data.data.users)
                    setRoles(res.data.data.roles)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const delUser = (id)=>{
        reqDelUser(id)
        .then(res=>{
            if(res.data.status===0){
                message.success("删除用户成功！")
                //刷新页面
                loadUser()
            }else{
                message.error("删除用户失败!")
                loadUser()
            }
        })
    }
    const addUserClick = () => {
        //创建用户btn方法
        setTitle("创建用户")
        setIsShow(true)
       

    }
    const modifyUser = (record)=>{
        //修改用户btn方法
        setUpdataUserId(record._id)
        setIsShow(true)
        setTitle("修改用户")
        form.setFieldsValue({
            username:record.username,
            email:record.email,
            phone:record.phone,
            create_time:record.create_time,
            role_id:record.role_id
            
        })
        console.log(record); 
    }
    const handleOk = async () => {
        //modalOK事件
        //获取表单数据
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            //调用添加用户api 
            if(title==="创建用户"){
                const result = await reqAddUser(values)
                if (result.data.status === 0) {
                    message.success("添加用户成功！")
                    loadUser()
                } else {
                    message.error("添加用户失败！")
                    loadUser()
                }
               
            }else{
                const result = await reqUpdateUser({...values,_id:updataUserId})
                console.log(result);
                if (result.data.status === 0) {
                    message.success("修改用户资料成功！")
                    loadUser()
                } else {
                    message.error("更新用户资料失败！")
                    loadUser()
                }
            }
            setIsShow(false)
        } catch {

        }
    }
    const handleCancel = () => {
        //modalCancel事件
        setIsShow(false)
    }
    const cradExtra = (<Button type="primary" onClick={addUserClick}>创建用户</Button>)

    return (
        <Card extra={cradExtra}>
            <Table
                rowKey="_id"
                bordered
                columns={columns}
                dataSource={users}
                rowKey={record => record._id}
            >

            </Table>
            <Modal
                title={title}
                visible={isShow}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="basic"
                    form={form}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入合法密码!' }]}
                    >
                        <Input type="password" placeholder="请输入合法密码" />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"

                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"

                    >
                        <Input
                            placeholder="请输入邮箱"
                            addonAfter={selectAfter}
                        />
                    </Form.Item>
                    <Form.Item
                        label="角色"
                        name="role_id"

                    >
                        <Select>
                            {roles.map(item => {
                                //根据获取到的角色列表遍历渲染Option 
                                return <Option value={item._id}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </Card>
    )
}

export default User
