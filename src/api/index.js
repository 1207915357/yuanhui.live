/** 
 * api接口的统一出口
 */
//用户模块
import user from '@/api/user';
// 文章模块接口
import article from '@/api/article';
// 其他模块的接口……

// 导出接口
export default {    
    user,
    article,
    // ……
}