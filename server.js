const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const methodOverride = require('method-override')
const connectDb = require('./config/dbConnection')

const countriesRouter = require('./routes/api/countriesRoutes')
const pagesRouter = require('./routes/pages/pagesRoutes')
const usersRouter = require('./routes/api/usersRoutes')

const passport = require('passport');
const passportConfig = require('./config/passportConfig');
const session = require('express-session');

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))

// View engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie:{
        maxAge: 6000*60
    }
}))
app.use(passport.initialize());
app.use(passport.session())





// Routes
app.use('/', pagesRouter)
app.use('/api/countries', countriesRouter)
app.use('/api/users', usersRouter)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000

connectDb()

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})
