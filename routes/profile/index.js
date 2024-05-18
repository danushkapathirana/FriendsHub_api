const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const middleware = require("../../middleware")
const profileController = require("../../controllers/profile")

router.post("/", [
    check("bio", "bio is required").not().isEmpty(),
    check("location", "location is required").not().isEmpty()
], middleware, profileController.createAndUpdateProfile)

router.post("/education", middleware, profileController.createEducation)
router.get("/", middleware, profileController.fetchAllProfiles)
router.get("/:id", middleware, profileController.fetchProfileById)
router.delete("/education/:id", middleware, profileController.removeEducation)

module.exports = router
