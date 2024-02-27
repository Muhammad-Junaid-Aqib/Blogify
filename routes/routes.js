const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signIn");
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body
  const user = User.matchPassword(email, password)

  console.log('Users', user)
  return res.redirect('/')

})
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password
  })
  return res.redirect('/')
})

module.exports = router;
