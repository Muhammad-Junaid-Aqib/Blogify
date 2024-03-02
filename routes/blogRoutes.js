const { Router } = require("express");

const router = Router();

router.get('/add-new-blog', (req, res) => {
    return res.render('addBlog', {
        user: res.user
    })
})

router.post('/', (req, res)=>{
    console.log("req.body", req.body)
    return res.redirect('/')
})

module.exports = router;
