const User = require("../models/User")

module.exports = async (req, res, next) => {
    try {
        user = await User.findById(req.session.userId)
        if (!!!user) {
            return res.redirect('/auth/login')
        } else {
            next()
        }
    } catch(err) {
        console.log(err)
    }
    
}