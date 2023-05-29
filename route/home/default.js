const {Article} = require('../../model/article');

module.exports = async (req,res) => {
    const articles = await Article.find()
    res.render('home/default', {
        articles
    })
}
