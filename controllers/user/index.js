const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { validationResult } = require("express-validator")

const User = require("../../models/User")

const userController = {
    createUser: async(req, res) => {
        try {
            const{ name, email, password } = req.body

            const validationErrors = validationResult(req) //retrieve the errors of "express-validator" checks, if any
            if(!validationErrors.isEmpty()) {
                console.log(validationErrors.errors)

                if(validationErrors.errors.length > 0) {
                    const errorMsg = validationErrors.errors.map((error) => error.msg)
                    console.log(errorMsg)

                    return res.status(403).send({errorMsg})
                }
            }

            const user = new User({ name, email, password })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            const newUser = await user.save()

            const payLoad = {user: {"id": user._id}}
            const token = jwt.sign(payLoad, config.get("jwt_key"), {expiresIn: "5h"})

            return res.status(200).send({"message": "new user creation successful", "userData": newUser, "token": token})
        }
        catch(error) {
            return res.status(400).send({"message": "new user creation encountered an error", "error": error.message})
        }
    }
}

module.exports = userController
