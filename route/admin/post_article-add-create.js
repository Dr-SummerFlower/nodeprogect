const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: path.join(__dirname, '../../public/uploads'),
        keepExtensions: true
    });
    form.parse(req, async (err, fields, files) => {
        fields.cover = files.cover.filepath.split('public')[1];
        await Article.create(fields)
        res.redirect('/admin/article')
    })
}