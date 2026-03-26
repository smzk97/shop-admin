import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息通知
export function Notification(msg,type='success',dangerouslyUseHTMLString=false){
    ElNotification({
        message: msg,
        type: type,
        duration: 2000,
        dangerouslyUseHTMLString
    })
}

// 消息弹出框
export function MessageBox(msg="",type="warning",title='消息提示') {
    return ElMessageBox.confirm(
    msg,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: type,
    }
  )
}

// 显示全屏loading
export function showFullLoading() {
    nprogress.start()
} 
// 隐藏全局loading
export function hideFullLoading() {
    nprogress.done()
} 

