const express = require("express")
const router = express.Router()
const {getCountries, getCountry, createCountry, updateCountry, deleteCountry, getAllCountries } =require('../../controllers/countriesControllers')
const validationToken = require('../../middleware/validateTokenHandlers')

const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.use(validationToken)


router.route('/').get(getCountries).post(createCountry)
router.route('/:id')
  .get(getCountry)
  .put(updateCountry)
  .delete(deleteCountry)

// Route pour obtenir les détails d'un pays spécifique et afficher le formulaire d'édition
router.route('/:id/edit').get(getCountry); // Utilisation correcte de route()

router.route('/all').get(getAllCountries); // Une nouvelle route pour récupérer tous les pays


module.exports = router
