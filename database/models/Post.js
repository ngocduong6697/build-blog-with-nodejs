const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String,
    image: String,
    createAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post