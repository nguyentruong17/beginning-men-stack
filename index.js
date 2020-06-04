const express = require("express");
const app = new express();
const path = require("path");
const ejs = require("ejs"); //helps to dynamically render HTML instead of just having static ones
const bodyParser = require("body-parser"); //parse incoming request bodies and make the form data form available under req.body

const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.set("view engine", "ejs"); //teling express to use ejs as templating engine (any file ending with .ejs would be rendered with ejs engine)
app.use(express.static("public")); //register a public folder in our static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log("App listening on 4000");
});

app.get("/", async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
  const allBlogs = await BlogPost.find({})
  //ejs engine will look into the folder 'views' and helps rendering the file index.ejs
  res.render("index", { allBlogs }); //now, index.ejs has access to the allBlogs variable
});

app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
  res.render("contact");
});

app.get("/post/:postId", async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  const blogPost = await BlogPost.findById(req.params.postId)
  res.render("post", { blogPost });
});

app.get("/posts/new", (req, res) => {
  //2-level routes
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  //console.log(req.body)
  await BlogPost.create(req.body)
  res.redirect("/");

});
