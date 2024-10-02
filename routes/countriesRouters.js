const express = require("express")
const router = express.Router()
const {getCountries, getCountry, createCountry, updateCountry, deleteCountry} =require('../controllers/countriesControllers')

router.route('/').get(getCountries).post(createCountry)
router.route('/:id').get(getCountry).patch(updateCountry).delete(deleteCountry)

module.exports = router

/*- 
    - **GET /countries** : Récupérer la liste de tous les pays.
    - **GET /countries/{id}** : Récupérer des informations spécifiques sur un pays par son ID.
    - **POST /countries** : Ajouter un nouveau pays.
    - **PATCH /countries/{id}** : Mettre à jour les informations d'un pays existant.
    - **DELETE /countries/{id}** : Supprimer un pays.*/