const express = require('express')
require('dotenv').config()
const path = require('path')

app = express()

const PORT = process.env.PORT


app.get('/',(req,res)=>{
    res.render('index.ejs')
})


app.get('/countries' ,(req,res)=>{

})


app.post('/countries' ,(req,res)=>{
    
})





app.listen(PORT, (req,res)=>[
    console.log(`Connected on port ${PORT}`)
])


