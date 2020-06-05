const express = require("express");
const app = new express();
const ejs = require("ejs"); //helps to dynamically render HTML instead of just having static ones
const bodyParser = require("body-parser"); //parse incoming request bodies and make the form data form available under req.body
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const { newPost, createPost, getAllPosts, getPostById } = require("./controllers/BlogPost")
const validateMiddleWare = require('./middlewares/validate')

app.set("view engine", "ejs"); //teling express to use ejs as templating engine (any file ending with .ejs would be rendered with ejs engine)
app.use(express.static("public")); //register a public folder in our static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//app.use(validateMiddleWare) // doing this way, validateMiddleware will be executed for all requests
app.use('/posts/store',  validateMiddleWare) // doing this way, validateMiddleware will be executed for creating post request

app.listen(4000, () => {
  console.log("App listening on 4000");
});

app.get("/", getAllPosts);

app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:postId", getPostById);

app.get("/posts/new", newPost); //2-level routes

app.post("/posts/store", createPost)
