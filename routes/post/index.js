const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const middleware = require("../../middleware")
const postController = require("../../controllers/post")

router.post("/", [
    check("text", "text is required").not().isEmpty()
], middleware, postController.createPost)

module.exports = router
