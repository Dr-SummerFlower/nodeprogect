//  该模块，主要处理文章集合
// 1-- 引入 mongoose 模块
const mongoose = require('mongoose')

// 2-- 设定文章集合的规则
const articleSchema = new mongoose.Schema({
    // 字段：标题，  作者，    发布时间，   文章封面，  内容
    //      title  author   publishDate    cover   content 

    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    author: {
        // 类型需要和User集合中的用户Id关联起来
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String        
    }
})

// 3-- 根据我们设定的集合规则，创建一张文章的数据表（集合）
const Article = mongoose.model('Article', articleSchema)


// 4-- 到处这个集合，供我们在路由中使用
module.exports = {
    Article
}