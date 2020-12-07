
import React from 'react'
import {  Redirect } from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import {setUser} from '../../utils/storageUtils'
/**
 * 登录的路由组件
 */

/**
 * async和await
 * 1.作用？
 *     简化promise对象的使用:不用再使用then()来指定成功/失败的回调函数
 *     以同步编码(没有回调函数了)方法实现异步流程
 * 2.哪里使用await？
 *     在返回promise的表达式的左侧写await:不想要promise,想要promise异步执行的成功的value数据
 * 3.在哪里写async？
 *     awaic所在函数(最近的)定义的左侧
 */
function login(props) {
    const [form] = Form.useForm();
    // const history = useHistory();
    const user = memoryUtils.user
    if(user._id){
        return <Redirect to="/"></Redirect>
    }
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            //解构赋值
            const { username, password } = values
            //登录
            reqLogin(username, password)
                .then(res => {
                    console.log(res);
                    if (res.data.status === 0) {
                        //登录成功
                        message.success('登录成功')
                        memoryUtils.user=res.data.data
                        console.log(res.data.data);
                        setUser(res.data.data)
                        //这里用replace 登录后不需要回退除非点退出登录
                        props.history.replace('/')
                    } else {
                        //登录失败
                        message.error(res.data.msg)
                    }
                })
                .catch(err => {

                })
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };



    return (
        <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo" />
                <h1>React:后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true, message: '请输入密码！'
                            }

                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle className="login-form-checkbox">
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={onCheck} className="login-form-button">
                            登录
        </Button>

                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

export default login
