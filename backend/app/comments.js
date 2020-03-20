const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middleware/auth');

const Comment = require('../models/Comment');

const router = express.Router();

router.post('/', [bodyParser.json(), auth], async (req,res) => {
    try {
        const commentData = req.body;
        commentData.author = req.user._id;
        const comment = new Comment(req.body);
        await comment.save();
        return res.send("Save");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', auth, async (req,res) => {
    try {
        console.log(req.params.id);
        const comments = await Comment.find({postId: req.params.id}).populate('author');
        res.send(comments);
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;