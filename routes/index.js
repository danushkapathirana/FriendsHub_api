const express = require("express")
const router = express.Router()

const userRoute = require("./user")
const profileRoute = require("./profile")
const postRoute = require("./post")

router.use("/user", userRoute)
router.use("/profile", profileRoute)
router.use("/post", postRoute)

module.exports = router
