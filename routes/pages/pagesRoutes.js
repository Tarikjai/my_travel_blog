const express = require('express');
const router = express.Router();
const Country = require('../../models/countryModel');

router.get('/', async (req, res) => {
  const countries = await Country.find().sort({createdAt: "desc"});
  res.render('index.ejs', { countries });
});

router.get('/form', (req, res) => {
  const country = new Country();
  console.log(req.user)
  if(req.isAuthenticated()){
    res.render('form.ejs', { country });
  }else {
    res.redirect("/login")
  }
  //res.render('form.ejs', { country });
});

router.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

router.get('/edit/:id', async (req, res) => {
  const country = await Country.findById(req.params.id);
  res.render('edit.ejs', { country });
});

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});

router.get('/country/:id', async (req, res) => {
  const country = await Country.findById(req.params.id);
  res.render('country.ejs', { country });
});

module.exports = router;