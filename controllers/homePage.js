const Post = require('../database/models/Post')
const connectDB = require('../connectDB');

module.exports = async (req, res) => {
    connectDB()
    const posts = await Post.find({}).populate('author')
    res.render('index', {
        posts
    })
}