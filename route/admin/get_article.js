const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    req.app.locals.localName = 'article'
    const articles = await Article.find().populate('author').lean();
    res.render('admin/article', {
        articles
    })
}