const asyncHandler = require("express-async-handler")

const Country = require('../models/countryModel')

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
    const { name, capital, description  } = req.body

    // Vérifie si le pays existe deja 
    const country = await Country.findOne({name})
    if (country) {
        return res.status(404).json({
            message: `${name} existe déja.`
        });
    }

    // Vérifie qu'aucun champ n'est null ou vide  
    if (!name || !capital || !description) {
        res.status(400)
        throw new Error('All fields are mandatory ! ');
    }
    try {
        const country = await Country.create({
            name,
            capital,
            description
        });
        res.status(201).json(country);
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
    const { name, capital, description } = req.body;

    // Vérification que tous les champs requis sont présents
    if (!name || !capital || !description) {
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

module.exports = {getCountries, getCountry, createCountry, updateCountry, deleteCountry}

