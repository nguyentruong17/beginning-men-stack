const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const TEST_TITLE = "This is a test title num0";
const TEST_BODY = "This is a test body num0";
const TEST_ID = "5ed962cece15e84094a33d4a";

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}); //while connecting, mongodb will create this db for us if it doesnt exist

//CREATE
// BlogPost.create(
//   {
//     title: TEST_TITLE,
//     body: TEST_BODY,
//   },
//   (error, blogpost) => {
//     console.log(error, blogpost);
//   }
// );

//READ
//find-all

//BlogPost.find({}, (error, blogs) => console.log(error, blogs))

//find with query filter
// BlogPost.find(
//   {
//     title: TEST_TITLE,
//   },
//   (err, blogs) => {
//     console.log(err, blogs);
//   }
// );

//find all the blogs with 'The' in the title
// BlogPost.find(
//     {
//       title: /This/, //This '/' acts like '%', and is called the wildcard operator
//     },
//     (err, blogs) => {
//       console.log(err, blogs);
//     }
//   );

//find single element with unique id
// BlogPost.findById(TEST_ID, (error, blogspot) =>{
//     console.log(error,blogspot)
//     })

//UPDATE
// BlogPost.findByIdAndUpdate(TEST_ID, 
//     {
//         title: `${TEST_TITLE}_updated`,
//     },
//     (err, blog) => {
//         console.log(err, blogs);
//     })

//DELETE
// BlogPost.findByIdAndDelete(TEST_ID, (error, blogspot) =>{
//     console.log(error,blogspot)
//     })