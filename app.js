const express = require("express")
require("dotenv").config()

const app = express()

app.listen(process.env.PORT || 9000, () => {
    console.log("server started")
})


/**
 * libraries
 * 
 * npm install mongoose
 */
