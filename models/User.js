const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bscrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.pre('save', async function(next) { //for registering user, therefore pre--save
    
    try {
        //technique2: auto geb hash and salt //https://www.npmjs.com/package/bcrypt
        this.password = await bscrypt.hash(this.password, 10) //this referencing to the cur user
        next()
    } catch (err){
        console.log(err)
    }
    
})

const User = mongoose.model('User', UserSchema)
module.exports = User