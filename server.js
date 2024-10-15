const express = require('express')
const cors = require('cors'); 
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const methodOverride = require('method-override');
const connectDb = require('./config/dbConnection')
const Country= require('./models/countryModel')


const countriesRouter = require('./routes/countriesRoutes');


const app = express()

app.use(cors());

// built-in middellware forform data
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method')); 
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory for your views
app.set('views', path.join(__dirname, 'views'));

// built-in middellware for json
app.use(express.json())
// Server static files 
app.use(express.static(path.join(__dirname,'/public')))

// method-override pour permettre de traiter le champ _method


app.use('/api/countries', countriesRouter);

const PORT = process.env.PORT || 3000

connectDb()

app.use('/api/countries', require('./routes/countriesRoutes'))
app.use('/api/users',require('./routes/usersRoutes'))
app.use(errorHandler)


//Pages
app.get('/', async(req,res)=>{
  //renvoie des informations sur le pays dans ma cards en index
  const countries = await Country.find().sort({createdAt :"desc"})
  res.render('index.ejs', { countries })
})

app.get('/form', (req, res) => {
  const country = new Country()
    res.render('form.ejs', { country });
});
app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});
app.get('/edit/:id', async(req, res) => {
  const country = await Country.findById(req.params.id)
  res.render('edit.ejs', { country });
});
app.get('/login', async(req, res) => {
 // const country = await Country.findById(req.params.id)
  res.render('login.ejs');
});
app.get('/register', async(req, res) => {
  // const country = await Country.findById(req.params.id)
   res.render('register.ejs');
 });

app.get('/country/:id', async(req, res) => {
  const country = await Country.findById(req.params.id)
  res.render('country.ejs', { country });
});

//fetch allcountries depuis mongodd pour les afficher dans la liste déroulante 


app.listen(PORT, ()=>{
    console.log(`Connected on port ${PORT}`)
})


 