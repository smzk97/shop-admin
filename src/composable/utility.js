import { ElNotification } from 'element-plus'

export function Notification(msg,type='success',dangerouslyUseHTMLString=false){
    ElNotification({
        message: msg,
        type: type,
        duration: 2000,
        dangerouslyUseHTMLString
    })
}

