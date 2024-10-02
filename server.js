const express = require('express')
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHanldler')
const { connect } = require('http2')
const connectDb = require('./config/dbConnection')

app = express()
// built-in middellware forform data
// app.use(express.urlencoded({ extended: false }));

// built-in middellware for json
app.use(express.json())

const PORT = process.env.PORT

connectDb()

app.use('/api/countries', require('./routes/countriesRouters'))
app.use(errorHandler)

app.listen(PORT, (req,res)=>[
    console.log(`Connected on port ${PORT}`)
])


