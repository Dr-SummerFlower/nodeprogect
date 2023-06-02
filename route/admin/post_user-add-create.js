
const { User, validateUser } = require('../../model/user')
const md5 = require('md5')

module.exports = (req, res) => {
    // res.send(req.body)
    // 1-- 拿到新增用户表单提交的数据
    const result = req.body

    async function run() {
        try {
            await validateUser(result)
            //  res.send('表单格式正确')
            //  做入库操作----下节课讲
            const f = await User.findOne({ email: result.email })
            if (f) {
                res.redirect('/admin/user-add?message=该用户已存在，请换一个试试')
                return
            }
            result.password = md5(result.password)
            const isOk = await User.create(result)
            if (isOk) {
                res.redirect('/admin/success')
                return
            }
            if (!isOk) {
                res.send('用户添加失败')
            }
        } catch (error) {
            // 如果错误，要把错误信息显示给用户
            // 跳转到 /admin/user-add 页面  get
            // console.log(error.message)
            res.redirect('/admin/user-add?message=' + error.message)
            return
        }

    }
    run();
}