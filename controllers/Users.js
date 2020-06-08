const User = require("../models/User");
const bcrypt = require("bcrypt");
const VALIDATION_ERR_KEY = "VALIDATION_ERR_KEY";

const newUserPage = (req, res) => {
  res.render("register", { errors: req.flash(VALIDATION_ERR_KEY) });
};

const loginUserPage = (req, res) => {
  res.render("login", { errors: req.flash(VALIDATION_ERR_KEY) });
};

const registerUser = async (req, res) => {
  try {
    //console.log(req.body)
    await User.create(req.body);
    await logInUser(req, res) //we want the user who just registered to automatically log in the system
    res.redirect("/");
  } catch (err) {
    //console.log(Object.keys(err))
    const validationErrs = Object.keys(err.errors).map(
      (key) => err.errors[key]["properties"]["message"]
    );
    req.flash(VALIDATION_ERR_KEY, validationErrs);
    res.redirect("/auth/register");
  }
};

const logInUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
        const validationErrs = ["User Not Found"];
        req.flash(VALIDATION_ERR_KEY, validationErrs);
        res.redirect("/auth/login");
    } else {
      const same = await bcrypt.compare(req.body.password, foundUser.password);
      if (same) {
        req.session.userId = foundUser._id; //did some research, they said it could be done by building a session collection in mongo-store
        res.redirect("/");
      } else {
        const validationErrs = ["Wrong Password"];
        req.flash(VALIDATION_ERR_KEY, validationErrs);
        res.redirect("/auth/login");
      }
    }
  } catch (err) {
    console.log(err);
    // const validationErrs = Object.keys(err.errors).map(
    //   (key) => err.errors[key]["properties"]["message"]
    // );
    // req.flash(VALIDATION_ERR_KEY, validationErrs);
    res.redirect("/auth/login");
  }
};

const logOutUser = async (req, res) => {
  await req.session.destroy(); //destroying all session data
  res.redirect("/");
};

exports.newUserPage = newUserPage;
exports.loginUserPage = loginUserPage;
exports.registerUser = registerUser;
exports.logInUser = logInUser;
exports.logOutUser = logOutUser;
