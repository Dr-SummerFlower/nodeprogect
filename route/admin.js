/*
 * @文件名： admin
 * @创建者： 夏花
 * @创建时间：2023-03-13
*/
// 导入express框架
const express = require('express');
const { User } = require('../model/user');
const md5 = require('md5');
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
    //需要判断用户是不是登录状态
    //如果没有处于登录状态，返回登陆页面
    //req,session.username存不存在
    if(!req.session.username){
        //说明用户没有处于登录状态
        //返回登陆首页
        res.redirect('/admin/login')
        return
    }
    //如果处于登录状态，允许渲染user页面
    res.render('admin/user',{
        username: req.app.locals.username
    });
})
// //用户编辑页面路由
// admin.get('/user-edit', (req,res)=>{
//     res.render('admin/user-edit');
// })
// //文章页面路由
// admin.get('/article', (req,res)=>{
//     res.render('admin/article');
// })
// //文章编辑页面路由
admin.get('/article-edit', (req,res)=>{
    res.render('admin/article-edit');
})
admin.get('/logout', (req,res)=>{
    //切断客户端和服务器的联系
    //删除服务器端session数据
    req.session.destroy(function(){
        //删除cookie数据
        res.clearCookie('connect.sid')
        //跳转回登录页
        res.redirect('/admin/login')
    })
})


//----------------post-------------------
admin.post('/login', async (req,res)=>{
    const user = req.body
    //服务器端验证客户端传递的数据
    if(user.email.trim().length == 0 || user.password.trim().length == 0){
        res.status(400).render('admin/error', {
            msg:'请输入邮箱或密码'
        })
        return
    }else{
        const result = await User.findOne({email:user.email})
        if(!result){
            res.status(400).render('admin/error', {
                msg:'请输入正确邮箱或密码'
            })
            return
        }
        if(md5(user.password) !== result.password){
            res.status(400).render('admin/error',{
                msg:'请输入正确邮箱或密码'
            })
            return
        }
        //如果代码到了这里，说明密码比对正确了
        //如果登陆成功，在跳转到user页面之前。我们还需要做几件事
        //把用户的姓名保存在req.session中
        //动态添加一个属性。username保存result.uesult.username
        req.session.username = result.username
        //需要把当前用户登陆成功后的用户名，保存在一个公共的位置
        //供header.htmk使用
        //在express框架，我们会把公共模块需要用到的数据库放在app.locals对象中
        //app  服务器模块比较特殊，不用导出，不用导入就可以在其他模块使用
        req.app.locals.username = result.username


        res.redirect('/admin/user')
    }
    // res.send(req.body)
})
// 暴露admin
module.exports=admin;