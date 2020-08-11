const express = require('express');
const router = express.Router();

// Model
const Posts = require('../models/post');

// Get all posts route
router.get('/', (req, res) => {
    Posts.find({}, (err, allPosts) => {
        res.json(allPosts);
    });
});

// Create new post route
router.post('/', (req, res) => {
    Posts.create(req.body, (err, newPost) => {
        res.json(newPost);
    })
});

// Delete a post
router.delete('/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        res.json(deletedPost);
    })
});

module.exports = router;