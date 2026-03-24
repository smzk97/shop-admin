import axios from 'axios'
import { getToken } from '@/composable/auth'
import { Notification } from '@/composable/utility'
const instance = axios.create({
    baseURL: '/api'
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    // 将token设置到请求头中
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。

    // 对响应数据做点什么
    response = response.data

    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 提示失败
    const msg = error.response.data.msg
    console.log(msg)
    Notification(msg || '请求失败','error')
    return Promise.reject(error);
  });
export default instance