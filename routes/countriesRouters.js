const express = require("express")
const router = express.Router()
const {getCountries, getCountry, createCountry, updateCountry, deleteCountry, getAllCountries } =require('../controllers/countriesControllers')

router.route('/').get(getCountries).post(createCountry)
router.route('/:id').get(getCountry).patch(updateCountry).delete(deleteCountry)

// Route pour obtenir les détails d'un pays spécifique et afficher le formulaire d'édition
router.route('/:id/edit').get(getCountry); // Utilisation correcte de route()

router.route('/all').get(getAllCountries); // Une nouvelle route pour récupérer tous les pays


module.exports = router

/*- 
    - **GET /countries** : Récupérer la liste de tous les pays.
    - **GET /countries/{id}** : Récupérer des informations spécifiques sur un pays par son ID.
    - **POST /countries** : Ajouter un nouveau pays.
    - **PATCH /countries/{id}** : Mettre à jour les informations d'un pays existant.
    - **DELETE /countries/{id}** : Supprimer un pays.*/