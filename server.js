const express = require('express')
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
 
const connectDb = require('./config/dbConnection')

const app = express()
// built-in middellware forform data
// app.use(express.urlencoded({ extended: false }));

// built-in middellware for json
app.use(express.json())
// Server static files 
app.use(express.static(path.join(__dirname,'/public')))
const PORT = process.env.PORT || 3000

connectDb()

app.use('/api/countries', require('./routes/countriesRouters'))
app.use(errorHandler)


app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.listen(PORT, ()=>{
    console.log(`Connected on port ${PORT}`)
})