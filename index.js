const express = require("express");
const app = new express();
const ejs = require("ejs"); //helps to dynamically render HTML instead of just having static ones
const bodyParser = require("body-parser"); //parse incoming request bodies and make the form data form available under req.body
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash") //store messages between requests and flush them after the next request is called

const mongoose = require("mongoose");
const userConfig = require("./config")
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-wm8kw.mongodb.net/my_database`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const {
  newPost,
  createPost,
  getAllPosts,
  getPostById,
} = require("./controllers/BlogPosts");
const {
  newUserPage,
  loginUserPage,
  registerUser,
  logInUser,
  logOutUser,
} = require("./controllers/Users");
const validateMiddleWare = require("./middlewares/validate");
const authenticateMiddleWare = require("./middlewares/authenticate");
const rebaseMiddleWare = require("./middlewares/redirectIfAuth");

app.set("view engine", "ejs"); //teling express to use ejs as templating engine (any file ending with .ejs would be rendered with ejs engine)
app.use(express.static("public")); //register a public folder in our static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true } only save cookie with https
  })
);

global.loggedIn = null;
app.use((req, res, next) => {
  //not specifying route in the first arg means all rooutes, or you can specify it as '*'
  loggedIn = !!req.session.userId;
  next();
});

app.use(flash()) //flash requires session
//app.use(validateMiddleWare) // doing this way, validateMiddleware will be executed for all requests
app.use("/posts/store", validateMiddleWare); // doing this way, validateMiddleware will be executed for creating post request

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

app.get("/", getAllPosts);

app.get("/auth/register", rebaseMiddleWare, newUserPage);
app.post("/users/store", rebaseMiddleWare, registerUser);

app.get("/auth/login", rebaseMiddleWare, loginUserPage);
app.post("/users/auth", rebaseMiddleWare, logInUser);

app.get("/auth/logout", authenticateMiddleWare, logOutUser); //better be a post, but implementing post for <a> takes more effort

app.get("/post/:postId", authenticateMiddleWare, getPostById);

app.get("/posts/new", authenticateMiddleWare, newPost); //2-level routes

app.post("/posts/store", authenticateMiddleWare, createPost);

//place not found middleware at the end of all routes
app.use((req, res) => res.render('notfound'))
