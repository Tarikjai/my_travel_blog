const express = require('express')
const cors = require('cors'); // Ajoutez cette ligne
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
 
const connectDb = require('./config/dbConnection')

const app = express()

app.use(cors());

// built-in middellware forform data
app.use(express.urlencoded({ extended: false }));
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory for your views
app.set('views', path.join(__dirname, 'views'));

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

 
app.get('/confirmation', (req, res) => {
    res.render('confirmation.ejs');
});

app.listen(PORT, ()=>{
    console.log(`Connected on port ${PORT}`)
})