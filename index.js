const express = require('express')
const { engine } = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')

const app = new express()

mongoose.connect('mongodb://localhost/build-blog-with-nodejs', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(fileUpload())

app.use(express.static('public'))

app.use(engine)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

const validateCreatePostMiddleware = (req, res, next) => {
    if(!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('posts/new')
    }
    next()
}

app.set('views', `${__dirname}/views`)

app.use('/posts/store', validateCreatePostMiddleware)

app.get('/', homePageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePostController)

app.get('/about', aboutController)

app.get('/contact', contactController)

app.listen(3000, () => {
    console.log('App listening on port 3000');
})
