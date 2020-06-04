const express = require('express')
const path = require('path')
const ejs = require('ejs') //helps to dynamically render HTML instead of just having static ones
const app = new express()

app.set('view engine', 'ejs') //teling express to use ejs as templating engine (any file ending with .ejs would be rendered with ejs engine)
app.use(express.static('public')) //register a public folder in our static files

app.listen(4000, ()=> {
    console.log('App listening on 4000')
})

app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index') //ejs engine will look into the folder 'views' and helps rendering the file index.ejs
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})
app.get('/post', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')
})