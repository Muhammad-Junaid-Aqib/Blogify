const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/routes');
const blogRouter = require('./routes/blogRoutes')
const { checkForAuthenticationCookie } = require("./middlewares/authenticationMiddleware");
const Blog = require("./models/blog");

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/Blogify').then( (e) => console.log("Mongodb Connected"))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// midleware
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.render("home",{
      user: req.user,
      blogs: allBlogs
    })
});

app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
