require('dotenv').config()
const express = require('express')
const edge = require('edge.js')
const cloudinary = require('cloudinary')
const { engine } = require('express-edge')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

// controller
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutUserController = require('./controllers/logout')

// middleware
const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

const app = new express()

// mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(connectFlash())

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}))

app.use(fileUpload())

app.use(express.static('public'))

app.use(engine)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.set('views', `${__dirname}/views`)

app.use("*", (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
})

app.get('/', homePageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', auth, createPostController)

app.get('/auth/logout', auth, logoutUserController)

app.post('/posts/store', auth, storePost, storePostController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.get('/auth/login', redirectIfAuthenticated, loginController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)


app.get('/about', aboutController)

app.get('/contact', contactController)

app.use((req, res) => res.render('not-found'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})
