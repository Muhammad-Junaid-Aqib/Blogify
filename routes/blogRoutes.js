const { Router } = require("express");
const multer  = require('multer')
const path = require('path')

// import 
const Blog = require('../models/blog');
const Comment = require("../models/comment");
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const uploads = multer({ storage: storage})

router.get('/add-new-blog', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

router.get('/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    // console.log("blog", blog)
    return res.render('blog', {
        user: req.user,
        blog
    })
})

router.post('/', uploads.single('coverImage'), async (req, res)=>{
    console.log("req.body", req.body)
    const {title, body} = req.body
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

// route for comments

router.post('/comment/:blogId', async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router;
