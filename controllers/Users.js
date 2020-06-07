const User = require('../models/User')
const bcrypt = require('bcrypt')

const newUserPage = (req, res) => {
    res.render('register')
}

const loginUserPage = (req, res) => {
    res.render('login')
}

const registerUser = async (req, res) => {
    try {
        //console.log(req.body)
        await User.create(req.body)
    } catch (err) {
        console.log(err)
        res.redirect('/auth/register')
    }
    res.redirect('/')
}

const logInUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })
        const same = await bcrypt.compare(req.body.password, foundUser.password)
        if (same) {
            req.session.userId = foundUser._id //did some research, they said it could be done by building a session collection in mongo-store
            res.redirect('/')
        } else {
            res.redirect('/auth/login')
        }
    } catch (err) {
        console.log(err)
        res.redirect('/auth/register')
    }
}

const logOutUser = async (req, res) => {
    await req.session.destroy() //destroying all session data
    res.redirect('/')
}





exports.newUserPage = newUserPage
exports.loginUserPage = loginUserPage
exports.registerUser = registerUser
exports.logInUser = logInUser
exports.logOutUser = logOutUser