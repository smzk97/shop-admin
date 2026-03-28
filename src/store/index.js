import { defineStore } from 'pinia'
import { reactive,ref } from 'vue' 
import { getInfo } from '@/api/manager'
export const useUserMsgStore = defineStore('UserMsg', () => {
    
    const user = ref({})                  // 用户信息
    const adsideWidth = ref("250px")      // 侧边栏宽度
    const menus = ref([])               // 菜单数据
    
    // 保存用户信息
    function SaveUserMsg(msg){
        user.value = msg
    }

    // 获取用户信息
    function getInfoWrap(){
        return new Promise((resolve,reject)=>{
            getInfo().then((getInfoRes) => {
                SaveUserMsg(getInfoRes)
                menus.value = getInfoRes.data.menus
                resolve(getInfoRes)
            }).catch(err=>reject(err))
        })
    }

    // 收缩侧边栏宽度
    function handleAsideWidth() {
        adsideWidth.value = adsideWidth.value == '250px' ? '64px' : '250px' 
    }
    
    return { user,adsideWidth,menus,SaveUserMsg,getInfoWrap,handleAsideWidth }
})