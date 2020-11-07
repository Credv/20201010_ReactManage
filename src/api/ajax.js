/**
 * 异步发送ajax请求函数模块
 * 封装axios库
 * 函数的返回值的promise对象
 */
import axios from 'axios'

export default function ajax(url,data={},type='GET'){
    if(type==='GET'){
        return axios.get(url,{
            params:data
        })
    }else{
         console.log(data)
        return axios.post(url,data)
    }
}