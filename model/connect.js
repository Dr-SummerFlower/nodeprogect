/*
 * @文件名： connect
 * @创建者： 夏花
 * @创建时间：2023-03-20
*/
//导入第三方模块"mongoose"连接mongodb数据库
const mongoose = require('mongoose')

//连接数据库
mongoose.connect("mongodb://127.0.0.1/ghe_blog")
//使用 .then,.catch 分别接受数据库返回的promise对象给出正确或错误的提示
.then(()=>console.log('数据库连接成功'))
.catch(err=>console.log('数据库连接失败',err))