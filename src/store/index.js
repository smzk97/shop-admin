import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { getInfo } from '@/api/manager'
export const useUserMsgStore = defineStore('UserMsg',()=>{
    const user = reactive({})
    function SaveUserMsg(msg){
        user.value = msg
    }

    // 获取用户信息
    function getInfoWrap(){
        return new Promise((resolve,reject)=>{
            getInfo().then((getInfoRes) => {
                SaveUserMsg(getInfoRes)
                resolve(getInfoRes)
            }).catch(err=>reject(err))
        })
    }
    
    return { user,SaveUserMsg,getInfoWrap }
})