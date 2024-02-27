const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRouter = require('./routes/routes')

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/Blogify').then( (e) => console.log("Mongodb Connected"))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
    //   return res.send("Welcome to Home page!");
    return res.render("home")
});

app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
