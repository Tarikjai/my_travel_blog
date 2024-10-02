const asyncHandler = require("express-async-handler")

const Country = require('../models/countryModel')

//#desc Get All Countries 
//@route GET /api/countries
//@acces public
const getCountries = asyncHandler(async(req,res)=>{
    res.status(200).json({message : "Get all contries"})
})

//#desc Get a Country
//@route GET /api/countries
//@acces public
const getCountry = asyncHandler(async(req,res)=>{
    res.status(200).json({message : `Get the contry with the id:  ${req.params.id}`})
})

//#desc  Create a country
//@route POST /api/countries
//@acces public
const createCountry = asyncHandler(async(req,res)=>{
    console.log(`The request body is : ${JSON.stringify(req.body)}`)

    const { name, capital, description  } = req.body
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


   // res.status(201).json(country)
})

//#desc Update a country 
//@route PATCH /api/countries
//@acces public
const updateCountry = asyncHandler(async(req,res)=>{
    res.status(200).json({message : `Update the country with the id:  ${req.params.id}`})
})

//#desc Delete one country 
//@route Delete /api/countries
//@acces public
const deleteCountry = asyncHandler(async(req,res)=>{
    res.status(200).json({message : `Delete the country with the id:  ${req.params.id}`})
})

module.exports = {getCountries, getCountry, createCountry, updateCountry, deleteCountry}