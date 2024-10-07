const express = require('express')
const cors = require('cors'); // Ajoutez cette ligne
require('dotenv').config()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const methodOverride = require('method-override');
const connectDb = require('./config/dbConnection')

const AllCountriesModel = require('./models/AllCountriesModel'); // Ajout de l'importation
const Country= require('./models/countryModel')

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

// method-override pour permettre de traiter le champ _method
app.use(methodOverride('_method')); 



const PORT = process.env.PORT || 3000




connectDb()

app.use('/api/countries', require('./routes/countriesRouters'))
app.use(errorHandler)


//Pages
app.get('/', async(req,res)=>{
  //renvoie des informations sur le pays dans ma cards en index
  const countries = await Country.find()
  res.render('index.ejs', { countries })
})

app.get('/confirmation', (req, res) => {
    res.render('confirmation.ejs');
});
app.get('/form', (req, res) => {
    res.render('form.ejs');
});
app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});
app.get('/edit/:id', async(req, res) => {
  const country = await Country.find()
  res.render('edit.ejs', { country });
});


//fetch allcountries depuis mongodd pour les afficher dans la liste déroulante 

app.get('/api/countriesList/all', async (req, res) => {
    try {
      const countries = await AllCountriesModel.find();
      res.json(countries);
    } catch (error) {
        console.log(countries)
      res.status(500).json({ error: 'Error fetching countries' });
    }
  });

app.listen(PORT, ()=>{
    console.log(`Connected on port ${PORT}`)
})

// rr
 