const path = require('path')
const express = require('express')
const { engine } = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload')

const app = new express()

mongoose.connect('mongodb://localhost/build-blog-with-nodejs', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(fileUpload())

app.use(express.static('public'))

app.use(engine)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.set('views', `${__dirname}/views`)

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req,res) => {

    const { image } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create(req.body, (error, post) => {
            res.redirect('/')
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(3000, () => {
    console.log('App listening on port 3000');
})
