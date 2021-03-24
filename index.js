const express = require('express')
const { engine } = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// controller
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')

// middleware
const storePostMiddleware = require('./middleware/storePost')

const app = new express()

mongoose.connect('mongodb://localhost/build-blog-with-nodejs', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(fileUpload())

app.use(express.static('public'))

app.use(engine)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.set('views', `${__dirname}/views`)

app.use('/posts/store', storePostMiddleware)

app.get('/', homePageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePostController)

app.get('/about', aboutController)

app.get('/contact', contactController)

app.listen(3000, () => {
    console.log('App listening on port 3000');
})
