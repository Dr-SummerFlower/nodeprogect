const { User } = require('../../model/user')

module.exports = async (req, res) => {
    req.app.locals.localName = 'user'
    const { message, id } = req.query
    const f = await User.findOne({ _id: id })
    res.render('admin/user-edit', {
        user: f,
        message
    })
}