const express = require("express")
require("dotenv").config()
const config = require("config")
const { default: mongoose } = require("mongoose")

const databaseConnection = async() => {
    try {
        await mongoose.connect(config.get("database_url"))
        console.log("connected to the database")
    }
    catch(error) {
        console.log(error)
    }
}

const app = express()
databaseConnection()

app.listen(process.env.PORT || 9000, () => {
    console.log("server started")
})


/**
 * libraries
 * 
 * npm install mongoose
 * npm install config
 * npm install jsonwebtoken
 */
