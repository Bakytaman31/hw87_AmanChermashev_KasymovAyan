const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const bodyParser = require('body-parser');

const config = require('../config');
const auth = require('../middleware/auth');

const Post = require('../models/Post');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find({}, {
        "title": 1,
        "description": 1,
        "image": 1,
        "author": 1,
        "datetime": 1
    }).sort({"datetime": -1}).populate("author");
    res.send(posts);
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id}).populate('author');

        if (!post) {
            return res.status(404).send({message: 'Not found'});
        } else {
            res.send(post);
        }
    } catch (error) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', [bodyParser.json(), auth, upload.single('image')], async (req, res) => {
    const postData = req.body;
    const user = req.user;
    postData.author = user._id;

    if (!req.file && !req.body.description) {
        return res.status(400).send({error: 'You have to fill at least description or image field'})
    } else if (req.file) {
        postData.image = req.file.filename;
    }

    const post = new Post(postData);

    try {
        await post.save();

        return res.send("Saved");
    } catch (error) {
        return res.status(400).send(error);
    }
});


module.exports = router;