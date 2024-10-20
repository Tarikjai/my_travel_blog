const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

            username :{
                type:String,
                required : [true , "Please add the contact username"]
            },
            email:{
                type:String,
                required : [true , "Please add the contact email adress"],
                unique: [true,"Email adress already taken"]
            },
            password :{
                type:String,
                required : [true , "Please add the user password"]
            },
            isMfaActive:{
                type: Boolean,
                required:false,
            },
            twoFactorSecret :{
                type:String
            },
        },
        { 
            timestamps: true 
        })

module.exports = mongoose.model("User", userSchema)