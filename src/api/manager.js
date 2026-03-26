import axios from '@/axios'

export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password,
    })
}
export function getInfo(){
    return axios.post('/admin/getinfo')
}
export function logOut() {
    return axios.post('/admin/logout')
}
export function upDatePassword(oldpassword,password,repassword) {
    return axios.post('/admin/updatepassword', {
        oldpassword,
        password,
        repassword,
    })
}