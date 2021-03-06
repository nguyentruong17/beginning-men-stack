const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({ //schema represents how a collection looks like, each doc in the collection would have the fields specified in schema
    title: String,
    body: String,
    created_at: {
        type: Date,
        default: new Date()
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId, //the value of userid needs to be a valid Mongo ObjectId
        ref: 'User', //referencing to the User collection
        required: true
    },
    image: {
        type: String,
        default: '/img/post-default.jpg' //https://neilpatel.com/blog/a-blog-isnt-a-blog-its-a-business/
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema) //the 1st argument is singular name of the collection we're creating --> BlogPosts, not BlogPost, collection
module.exports = BlogPost