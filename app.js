/*
 * @文件名： app
 * @创建者： 夏花
 * @创建时间：2023-03-13
*/
// 导入express框架
const express = require('express');
// 导入path
const path = require('path')
// 导入body-parser模块
const bodyParser = require('body-parser');
// 导入数据库连接
require('./model/connect.js')
// const user = require('./model/user.js')
const session = require('express-session')


// 导入home路由
const home = require('./route/home');
// 导入admin路由
const admin = require('./route/admin');
const { prototype } = require('events');


// 创建服务器对象app
const app = express();
// 配置模版引擎
app.engine('html', require('express-art-template'))
// 设置默认文件读取目录
app.set('views', path.join(__dirname, 'views'))
// 设置默认文件后缀
app.set('view engine', 'html')
// express.static设置静态资源文件地址
app.use(express.static(path.join(__dirname, 'public')))
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// cookie配置
app.use(session({
    secret: 'keyboard cat',
    // 强制将未初始化的会话保存到存储中
    saveUninitialized: false,
    cookie: {
        // 设置cookie的存活时间，当时间结束，cookie会自动销毁
        maxAge: 24 * 60 * 60 * 1000
    }
}))

//创建中间件拦截未登录用户
app.use('/admin', require('./middleware/guard.js'))

// 挂载home和admin路由
app.use('/home', home);
app.use('/admin', admin);


// 监听25551端口
app.listen(25551, '0.0.0.0');
console.log('服务器已经在25551端口启动');
console.log('admin快捷地址http://127.0.0.1:25551/admin');
console.log('home快捷地址http://127.0.0.1:25551/home');
