const asyncHandler = require("express-async-handler")

const Country = require('../models/countryModel')
const AllCountriesModel = require('../models/AllCountriesModel'); // Ajout de l'importation

//#desc Get All Countries 
//@route GET /api/countries
//@acces public
const getCountries = asyncHandler(async(req,res)=>{
    const countries = await Country.find()
    res.status(200).json(countries)
})

//#desc Get a Country
//@route GET /api/countries
//@acces public
const getCountry = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const countries = await Country.findById(id)
    if(!countries){
        res.status(400)
        throw new Error('Contact not found ! ')
        
    }
    res.status(200).json(countries)
})

//#desc  Create a country
//@route POST /api/countries
//@acces public
const createCountry = asyncHandler(async(req,res)=>{
    console.log(`The request body is : ${JSON.stringify(req.body)}`)
    const { name, capital, description, image } = req.body

   /* name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();*/
    // Vérifie si le pays existe deja 
    const existingCountry  = await Country.findOne({name})
    if (existingCountry ) {
        return res.status(404).json({
            message: `${name} existe déja.`
        });
    }

    // Vérifie qu'aucun champ n'est null ou vide  
    if (!name || !capital || !description || !image) {
        res.status(400)
        throw new Error('All fields are mandatory ! ');
    }
    try {
        const newCountry  = await Country.create({
            name,
            capital,
            description,
            image
        });
           // Vérifie si la requête provient d'un formulaire
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded' || req.headers['content-type'] === 'multipart/form-data') {
            // Redirige vers la page de confirmation
            res.redirect('/confirmation'); 
        } else {
            // Renvoie la réponse JSON pour les requêtes API
            res.status(201).json(newCountry);
        }
    } catch (error) {
        console.error("Error creating country:", error); // Affichez l'erreur si la création échoue
        res.status(500).json({ message: "Failed to create country" });
    }
    
})

//#desc Update a country 
//@route PATCH /api/countries
//@acces public
const updateCountry = asyncHandler(async (req, res) => {
    const countryId = req.params.id;  
    const { name, capital, description, image } = req.body;

    // Vérification que tous les champs requis sont présents
    if (!name || !capital || !description || !image) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    try {
        // Cherche le pays par ID
        const country = await Country.findById(countryId); // Ajout de await ici
        
        // Vérifie si le pays existe et que le nom correspond
        if (!country || country.name !== name) {
            return res.status(404).json({
                message: `${name} n'a pas été trouvé dans la base de données ou le nom ne correspond pas.`
            });
        }

        // Mettre à jour uniquement le capital et la description
        country.capital = capital;
        country.description = description;
        country.image = image
        // Sauvegarder les modifications
        const updatedCountry = await country.save();

        res.status(200).json({
            message: `${name} a été mis à jour avec succès`,
            data: updatedCountry
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la mise à jour du pays',
            error: error.message // Correction ici : remplace 'err' par 'error'
        });
    }
});

//#desc Delete one country 
//@route Delete /api/countries
//@acces public
const deleteCountry = asyncHandler(async(req,res)=>{
    const params = req.params 
    const country = await Country.findById(params.id)
    
    if (!country){
        res.status(404).json({message : `${params.id} Not Found`})
    }
    await country.deleteOne()
    
    res.status(200).json({message : `The country of ${country.name} has been deleted.`})
})



//#desc Get All Countries from AllCountriesModel
//@route GET /api/countries/all
//@acces public
const getAllCountries = asyncHandler(async (req, res) => {
    const countries = await AllCountriesModel.find(); // Assurez-vous que vous utilisez le bon modèle
    
    res.status(200).json(countries);
});


module.exports = {getCountries, getCountry, createCountry, updateCountry, deleteCountry, getAllCountries}

