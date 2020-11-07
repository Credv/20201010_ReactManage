import React, { useState, useEffect } from 'react'
import './index.less'
import menuList from '../../config/menuConfig'
import { Menu, Dropdown, Modal, Button, Space } from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils'
import { withRouter, useHistory } from 'react-router-dom';
//user数据
import memoryUtils from '../../utils/memoryUtils'
import { getUser,removeUser } from '../../utils/storageUtils'
import currentUser from '../../utils/memoryUtils'

const { confirm } = Modal;
function Header(props) {
    const [currentTime, setCurrentTime] = useState(''); //当前时间
    const [currentTitle, setCurrentTitle] = useState(''); //当前标题
    // const [currentUser,setCurrentUser] = useState('')
    const history = useHistory();
    let intId = ''
    useEffect(() => {
        
        
        setCurrentTime(formateDate(Date.now())) //拉取当前时间
        getTime() //调用计时器
        //return一个函数表示在componentWillUnmount执行
        return ()=>{
            clearInterval(intId)
        }   
    }, [])
    //useEffect的第二个参数必须传空数组，这样它就等价于只在componentDidMount的时候执行。

    useEffect(() => {
        menuList.forEach(item => {
            if (item.key === props.location.pathname) {
                setCurrentTitle(item.title)
            } else if (item.children) {
                item.children.map(p => {
                    if (p.key === props.location.pathname) {
                        setCurrentTitle(p.title)
                    }
                })
            }
        })
    },[props.location.pathname])//尝试下
    //如果不传第二个参数的话，它就等价于componentDidMount和componentDidUpdate
    
   
    const showConfirm = () => {
        confirm({
            title: '您确定要退出系统吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                //确认退出登录
                console.log('OK');
                //删除保存的user数据
                removeUser()
                memoryUtils.user={}
                //跳转到login页面
                history.replace('/login')
               
                

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const getTime = () => {
        intId = setInterval(() => {
            setCurrentTime(formateDate(Date.now()))
        }, 1000)
        
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Button>通知中心</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={showConfirm} style={{ width: "100%" }}>退出</Button>
            </Menu.Item>


        </Menu>
    );


    return (
        <div className="header">
            <div className="header-top">

                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        欢迎，{currentUser.user.username} <DownOutlined />
                    </a>
                </Dropdown>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{currentTitle}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="" />
                    <span>晴</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header) 
