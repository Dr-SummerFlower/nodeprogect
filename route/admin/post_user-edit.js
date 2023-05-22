const { User, validataUser } = require('../../model/user')
const md5 = require('md5')
module.exports = (req, res) => {
    const result = req.body
    const data = {
        username: result.username,
        email: result.email,
        password: result.password,
        role: result.role,
        state: result.state,
    }
    const id = result.id
    async function run() {
        try {
            await validataUser(data)

            await User.findOneAndUpdate({ _id: id }, data)

            res.redirect('/admin/user')
        } catch (error) {
            // 如果错误，要把错误信息显示给用户
            // 跳转到 /admin/user-add 页面  get
            // console.log(error.message)
            res.redirect('/admin/user-edit?message=' + error.message + '&id=' + result.id)
            return
        }
    }
    run()
    // res.send('ok')
}