module.exports = (req, res) => {
    req.app.locals.localName = 'article'
    res.render('admin/article-edit');
}