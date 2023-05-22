const formidable = require('formidable')
const path = require('path')

module.exports = (req, res) => {
    const form = formidable({ 
        multiples: true,
        uploadDir: path.join(__dirname,'../../public/uploads'),
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        res.json({fields,files})
    })
}