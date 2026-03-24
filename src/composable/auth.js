import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
const TokenKey = 'admin-token'

// 获取token
export function getToken(){
    return cookies.get(TokenKey)
} 

// 设置token
export function setToken(token){
    cookies.set(TokenKey,token)
}

// 移除token
export function removeToken(){
    cookies.remove(TokenKey)
}