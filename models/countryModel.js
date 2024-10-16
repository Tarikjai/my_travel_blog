const mongoose =require('mongoose')

const countrySchema = mongoose.Schema(
        {
            user_id:{
                type : mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"User" // reference of the model
            },
            name: {
                type: String,
                required : [true , "Please add the country name" ],
                immutable: true,
                unique: true
            },
            capital:{
                type: String,
                required : [true , "Please add the capital name" ]
            },
            description:{
                type: String,
                required : [true , "Please add a description" ]
            },
            image:{
                type:String,
                required : [true , "Please add an image" ],
            }
        },
        {
            timestamps: true
        })


module.exports = mongoose.model("Country", countrySchema)
