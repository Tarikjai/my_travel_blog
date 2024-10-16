const asyncHandler = require("express-async-handler")
const Country = require('../models/countryModel')
const AllCountriesModel = require('../models/AllCountriesModel'); // Ajout de l'importation


//@route GET /api/countries
const getCountries = asyncHandler(async(req,res)=>{
    const countries = await Country.find({user_id: req.user.id})
    res.status(200).json(countries)
})

//#desc Get a Country
const getCountry = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const countries = await Country.findById(id)
    if(!countries){
        res.status(400)
        throw new Error('Contact not found ! ')
        
    }
    res.status(200).json(countries)
})

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
   
    // Créer un nouveau pays
    try {
        const newCountry  = await Country.create({
            name,
            capital,
            description,
            image,
            user_id: req.user.id
        });
        console.log(newCountry)
           // Vérifie si la requête provient d'un formulaire
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded' || req.headers['content-type'] === 'multipart/form-data') {
            // Redirige vers la page de confirmation
            res.redirect(`/country/${newCountry._id}`);
        } else {
            // Renvoie la réponse JSON pour les requêtes API
            res.status(201).json(newCountry);
        }
    } catch (error) {
        console.error("Error creating country:", error); // Affichez l'erreur si la création échoue
        res.status(500).json({ message: "Failed to create country" });
    }
    
})


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
        const country = await Country.findById(countryId);
        
        // Vérifie si le pays existe
        if (!country) {
            return res.status(404).json({
                message: `Pays avec l'ID ${countryId} non trouvé dans la base de données.`
            });
        }

        // Mettre à jour tous les champs
        country.name = name;
        country.capital = capital;
        country.description = description;
        country.image = image;

        // Sauvegarder les modifications
        const updatedCountry = await country.save();
        console.log('Article saved:', updatedCountry)

        // Vérifier si la requête provient d'un formulaire HTML
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            // Rediriger vers la page de confirmation
            res.redirect(`/country/${countryId}`);
        } else {
            // Renvoyer une réponse JSON pour les requêtes API
            res.status(200).json({
                message: 'Country updated successfully',
                data: updatedCountry
            });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du pays:", error);
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            // Rediriger vers une page d'erreur ou le formulaire avec un message d'erreur
            res.redirect(`/countries/${req.params.id}/edit?error=true`);
        } else {
            res.status(500).json({
                message: 'Erreur lors de la mise à jour du pays',
                error: error.message
            });
        }
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




// ... existing code ...

 
module.exports = {getCountries, getCountry, createCountry, updateCountry, deleteCountry, getAllCountries}

