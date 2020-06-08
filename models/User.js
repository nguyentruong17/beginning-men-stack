const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bscrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Missing username'], //an error with the message of 'missing username' will be returned if username is null when creating a new user
        unique: [true, 'This username has been taken'] //unique constraint will not return the 2nd arg string, but the error code E11000, so we habe to install package to handle it
    },
    password: {
        type: String,
        required: [true, 'Missing password'],
    },
})

UserSchema.plugin(uniqueValidator, { message: 'This username has been taken' }) //since we only have the field username to be unique

UserSchema.pre('save', async function(next) { //for registering user, therefore pre--save
    
    try {
        //technique2: auto gen hash and salt //https://www.npmjs.com/package/bcrypt
        this.password = await bscrypt.hash(this.password, 10) //this referencing to the cur user
        next()
    } catch (err){
        console.log(err)
    }
    
})

const User = mongoose.model('User', UserSchema)
module.exports = User