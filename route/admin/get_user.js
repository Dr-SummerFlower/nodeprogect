const { User } = require('../../model/user')

module.exports = async (req, res) => {
    req.app.locals.localName = 'user'
    const users = await User.find()
    res.render('admin/user', {
        users
    });
}