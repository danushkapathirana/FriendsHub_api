const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const middleware = require("../../middleware")
const profileController = require("../../controllers/profile")

router.post("/", [
    check("bio", "bio is required").not().isEmpty(),
    check("location", "location is required").not().isEmpty()
], middleware, profileController.createAndUpdateProfile)

module.exports = router
