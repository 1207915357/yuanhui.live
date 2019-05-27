/** 
 * api接口的统一出口
 */
//用户模块
import user from '@/api/user';
//文章模块接口
import article from '@/api/article';
//通知模块
import notice from '@/api/notice';
//评论模块
import comment from '@/api/comment';
// 其他模块的接口……

// 导出接口
export default {    
    user,
    article,
    notice,
    comment
    // ……
}