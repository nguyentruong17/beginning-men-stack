const BlogPost = require('../models/BlogPost.js')
const path = require('path')
const { v4: uuidv4 } = require("uuid");
const VALIDATION_ERR_KEY = 'VALIDATION_ERR_KEY'
const newPost = (req, res) => {
  //console.log('NEW')
  
  //console.log(req.flash(VALIDATION_ERR_KEY))
  res.render("create", { errors: req.flash(VALIDATION_ERR_KEY) });
};

const createPost = async (req, res) => {
  //console.log('CREATE')
  const userid = req.session.userId

  if (req.files) {
    let image = req.files.image;
    const name = image.name.split(".")[0];
    const type = image.name.split(".")[1];
    const imageName = `${name}${uuidv4()}.${type}`;
    image.mv(path.resolve(__dirname, '..', "public/img", imageName), async (err) => {
      //moving the image to public/img with the imageName name
      await BlogPost.create({
        ...req.body,
        image: `/img/${imageName}`,
        userid
      });
    });
  } else {
    await BlogPost.create({ ...req.body, userid });
  }

  res.redirect("/");
};

const getAllPosts = async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
  const allPosts = await BlogPost.find({}).populate('userid'); //join-like operation with key userid
  //console.log(req.session)
  //ejs engine will look into the folder 'views' and helps rendering the file index.ejs
  res.render("index", { allPosts }); //now, index.ejs has access to the allBlogs variable
};

const getPostById = async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  const blogPost = await BlogPost.findById(req.params.postId).populate('userid');
  console.log(blogPost)
  res.render("post", { blogPost });
};

let updatePost;
let deletePost;

exports.newPost = newPost
exports.createPost = createPost
exports.getAllPosts = getAllPosts
exports.getPostById = getPostById

