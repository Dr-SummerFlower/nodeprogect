const Joi = require('joi')
module.exports = (req,res)=>{
    // res.send(req.body)
    // 1-- 拿到新增用户表单提交的数据
    const result = req.body

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


    async function run (){
        try {
            await schema.validateAsync(result)
             res.send('表单格式正确')
            //  做入库操作----下节课讲

            } catch (error) {
                // 如果错误，要把错误信息显示给用户
                // 跳转到 /admin/user-add 页面  get
                // console.log(error.message)
                res.redirect('/admin/user-add?message='+error.message)
                return
            }
            
        }
    run()


}