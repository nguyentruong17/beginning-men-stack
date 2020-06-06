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
        console.log(req.body)
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
            res.redirect('/')
        } else {
            res.redirect('/auth/login')
        }
    } catch (err) {
        console.log(err)
        res.redirect('/auth/register')
    }
}





exports.newUserPage = newUserPage
exports.loginUserPage = loginUserPage
exports.registerUser = registerUser
exports.logInUser = logInUser