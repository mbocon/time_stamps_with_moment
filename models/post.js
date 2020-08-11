const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date
});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;