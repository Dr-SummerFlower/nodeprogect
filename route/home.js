/*
 * @文件名： home
 * @创建者： 夏花
 * @创建时间：2023-03-13
*/
// 导入express框架
const express = require('express');
// 引入Router方法
const home = express.Router();

// 二级路由
home.get('/', (req,res)=>{
    res.send('博客首页');
})
//文章详情页路由
home.get('/article', (req,res)=>{
    res.render('home/article')
})
//文章预览页路由
home.get('/default', (req,res)=>{
    res.render('home/default')
})

// 暴露home
module.exports=home;