const { User } = require('../../model/user')

module.exports = async (req,res)=>{
    const id = req.query.id
    const f = await User.findOne({_id: id})
    res.render('admin/user-edit', {
        user: f
    })
}