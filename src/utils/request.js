// axios的封装处理
import axios from "axios"
import { clearToken, getToken } from "./token"
import router from "../router"

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 响应拦截器

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use((config) => {
    const token = getToken()//在接口的请求头中添加token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        clearToken()
        router.navigate('/login')
        window.location.reload()//强制跳转
    }
    return Promise.reject(error)
})

export { request }



