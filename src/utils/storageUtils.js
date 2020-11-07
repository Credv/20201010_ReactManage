/**
 * 进行localStorage数据存储
 */

    /**
     * 保存user
     */
   export function setUser(user){
        localStorage.setItem('user_key',JSON.stringify(user))
    }
    /**
     * 读取user
     */
    export function getUser(){
        return JSON.parse(localStorage.getItem('user_key')||'{}') 
    }
    /**
     * 删除user
     */
    export function removeUser(){
        localStorage.removeItem('user_key')
    }
    /**
     * 是否登录
     */
    export function isLogin(){
        if(localStorage.getItem('user_key')){
            return true
        }else{
            return false
        }
    }
