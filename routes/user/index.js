const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const userController = require("../../controllers/user")

router.post("/create", [
    check("name", "name is required").not().isEmpty(),
    check("email", "email format is invalid").isEmail(),
    check("password", "password is required").not().isEmpty()
], userController.createUser)

module.exports = router
