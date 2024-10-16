const express = require('express');
const router = express.Router();

const pageRoutes = require('./pages/pageRoutes');
const countriesRoutes = require('./api/v1/countriesRoutes');
const usersRoutes = require('./api/v1/usersRoutes');

router.use('/', pageRoutes);
router.use('/api/countries', countriesRoutes);
router.use('/api/users', usersRoutes);

module.exports = router;
