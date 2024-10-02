const mongoose =require('mongoose')

const countrySchema = mongoose.Schema(
        {

            name: {
                type: String,
                required : [true , "Please add the country name" ]
            },
            capital:{
                type: String,
                required : [true , "Please add the capital name" ]
            },
            description:{
                type: String,
                required : [true , "Please add a description" ]
            },
        },
        {
            timestamps: true
        })


module.exports = mongoose.model("Country", countrySchema)
