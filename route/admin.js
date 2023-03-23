/*
 * @文件名： admin
 * @创建者： 夏花
 * @创建时间：2023-03-13
*/
// 导入express框架
const express = require('express');
const { User } = require('../model/user');
// 引入Router方法
const admin = express.Router();
//引入数据库连接模块

//----------------get-------------------
// 二级路由
admin.get('/', (req,res)=>{
    res.send('管理首页');
})
//登录页面路由
admin.get('/login', (req,res)=>{
    res.render('admin/login');
})
//用户页面路由
admin.get('/user', (req,res)=>{
    res.render('admin/user');
})
//用户编辑页面路由
admin.get('/user-edit', (req,res)=>{
    res.render('admin/user-edit');
})
//文章页面路由
admin.get('/article', (req,res)=>{
    res.render('admin/article');
})
//文章编辑页面路由
admin.get('/article-edit', (req,res)=>{
    res.render('admin/article-edit');
})


//----------------post-------------------
admin.post('/login', async (req,res)=>{
    const user = req.body
    //服务器端验证客户端传递的数据
    if(user.email.trim().length == 0 || user.password.trim().length == 0){
        res.status(400).render('admin/error', {
            msg:'请输入邮箱或密码'
        })
    }else{
        const result = await User.findOne({email:user.email})
        if(!result){
            res.status(400).render('admin/error', {
                msg:'请输入正确邮箱或密码'
            })
        }
    }
    // res.send(req.body)
})
// 暴露admin
module.exports=admin;