const express = require("express")
require("dotenv").config()
const config = require("config")
const { default: mongoose } = require("mongoose")
const bodyParser = require("body-parser")

const routes = require("./routes")

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

app.use(bodyParser.json()) //"body-parser" middleware to parse incoming request bodies in JSON format
app.use("/app", routes)

app.listen(process.env.PORT || 9000, () => {
    console.log("server started")
})


/**
 * libraries
 * 
 * npm install mongoose
 * npm install config
 * npm install jsonwebtoken
 * npm install express-validator
 * npm install bcryptjs
 */

/**
 * API endpoint
 * 
 * user
 * =====
 * 
 * /app/user/create => new user creation
 * /app/user/login => user login
 * 
 * profile
 * =====
 * 
 * /app/profile/ => new profile creation or update profile
 * /app/profile/education => profile education entry
 * /app/profile => get all profiles
 */
