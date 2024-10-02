const mongoose = require('mongoose')

require('dotenv').config()

CONNECTION_STRING = process.env.CONNECTION_STRING

const connectDb = async() =>{

    try {
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Database connected: ", 
            connect.connection.host,
            connect.connection.name
        )
    } catch (error) {
        
    }

};
 

module.exports = connectDb