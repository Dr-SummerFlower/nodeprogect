/*
 * @文件名： user
 * @创建者： 夏花
 * @创建时间：2023-03-20
*/
// 主要是用来创建用户集合
// 1 -- 引入 mongoose 模块 
// mongoose.Schema()  生成一个集合规则
const mongoose = require('mongoose')
const md5 = require('md5');
const Joi = require('joi')

// 2-- 创建用户集合----  用户表
// mongoose.Schema()方法返回值是一个构造函数，需要new实例化出来一个对象
const userSchema = new mongoose.Schema({
    // 集合的每一个字段和字段类型等参数
    // 用户名（必须要有，字符串，2-20字符），
    // 邮箱（必须要有，字符串，唯一的   unique: true, ），
    // 密码（必须要有，字符串），
    // 角色（超级管理员---admin， String, 必须有），
    // 状态（启用---0    禁用----1，可以没有，如果没有，默认为 0 启用）
    //   required: true,  表示该字段必须要有值
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        default: 0
    }
})
// 3-- 创建一个User集合
//  mongoose.model()
const User = mongoose.model('User', userSchema)

// 未来涉及到针对于这个User集合的增删改查，是不是都要在路由文件中进行？
// 一定是需要路由文件 admin.js  home.js 导入使用的，
// 我们在这里创建一个用户，模拟用户，未来这里的代码需要注释掉，不然，每次运行node都会在数据建库创建该用户
// 返回值依然是 promise 对象
User.create({
    username: 'zhangsan',
    email: 'zhangsan@qq.com',
    password: md5('123456'),
    role: 'admin',
    state: 0
}).then(()=>{console.log('用户创建成功')})
.catch(()=>{console.log('用户创建失败')})

// 4--  把这个 User 集合 导出



const validataUser = (user) => {
    // 2-- 对表单中的数据进行格式验证
    // username : 2-20  必须要有  字符串类型
    // 让我们自己写代码-比较麻烦
    // 要使用一个第三方模块，帮助我们来做数据格式验证
    // if(username.length > 2 && username.length < 20 && typeof(username) == 'string' && )
    // joi 模块
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().alphanum().error(new Error('用户名格式不正确，请重新输入')),
        email: Joi.string().email().required().error(new Error('邮箱格式不正确，请重新输入')),
        password: Joi.string().required().error(new Error('密码格式不正确，请重新输入')),
        role: Joi.string().required(),
        state: Joi.number().default(0)
    })

    return schema.validateAsync(user)
}
module.exports = {
    User,
    validataUser
}