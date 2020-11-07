import React from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import './index.less'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
function LeftNav(props) {
    const history = useHistory();
    const path = props.location.pathname
    const hasAuth = (item) => {
        const { key, isPublic } = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        if (username === 'admin' || isPublic || menus.indexOf(key) != -1) {
            return true
        }
        return false

    }

    return (
        <div className="left-nav">
            <header className="left-nav-header">
                <img src={logo} alt="" />
                <h1>React</h1>
            </header>

            <Menu
                // 默认打开的menu.item 
                selectedKeys={[path]}
                // 默认打开的子菜单
                defaultOpenKeys={[path.slice(0, path.search(/:/) + 1)]}
                mode="inline"

                theme="dark"
            >
                {/* 动态渲染导航栏与二级导航  */}
                {
                    menuList.map(item => {
                        if (hasAuth(item)) {
                            if (!item.children) {
                                return <Menu.Item
                                    key={item.key}
                                    icon={item.icon}
                                    onClick={() => history.push(item.key)}
                                >
                                    {item.title}
                                </Menu.Item>
                            } else {
                                return <SubMenu
                                    key={item.key}
                                    title={item.title}
                                    icon={item.icon}
                                    onTitleClick={subKey => { props.match.path = subKey.key }}
                                >
                                    {item.children.map(p => {
                                        return <Menu.Item key={p.key} icon={p.icon} onClick={() => history.push(p.key)}>{p.title}</Menu.Item>
                                    })}
                                </SubMenu>
                            }
                        }
                    })
                }
            </Menu>
        </div>
    )
}
/**
 * 高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 
 * 然后react-router的三个对象history, location, match就会
 * 被放进这个组件的props属性中.
 * withRouter实现原理: 
 * 将组件包裹进 Route, 然后返回
 * const withRouter = () => {
 *  return () => {
 * return <Route component={Nav} />
 *      }
 * }
 */

export default withRouter(LeftNav)
