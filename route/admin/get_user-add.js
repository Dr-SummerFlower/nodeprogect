module.exports = (req, res) => {
    req.app.locals.localName = 'user'
    const { message } = req.query
    res.render('admin/user-add', {
        message
    });
}