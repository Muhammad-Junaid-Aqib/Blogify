const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/routes');
const { checkForAuthenticationCookie } = require("./middlewares/authenticationMiddleware");

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/Blogify').then( (e) => console.log("Mongodb Connected"))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

app.get("/", (req, res) => {
    //   return res.send("Welcome to Home page!");
    return res.render("home",{
      user: req.user
    })
});

app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
