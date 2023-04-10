/*
 * @文件名： admin
 * @创建者： 夏花
 * @创建时间：2023-03-13
*/
// 导入express框架
const express = require('express');
// 引入Router方法
const admin = express.Router();

// 二级路由
//----------------get-------------------
admin.get('/', (req,res)=>{
    res.send('管理首页');
})
//登录页面路由
admin.get('/login', require('./admin/get_login'))
//用户页面路由
admin.get('/user', require('./admin/get_user'))
//用户添加页路由
admin.get('/user-add', require('./admin/get_user-add'))
//用户编辑页面路由
admin.get('/user-edit', require('./admin/get_user-edit'))
//文章页面路由
admin.get('/article', require('./admin/get_article'))
//文章编辑页面路由
admin.get('/article-edit', require('./admin/get_article-edit'))
admin.get('/logout', require('./admin/get_logout'))

//----------------post-------------------
admin.post('/login', require('./admin/post_login'))
admin.post('/user-add', require('./admin/post_user-add-create'))

// 导出admin模块
module.exports=admin;