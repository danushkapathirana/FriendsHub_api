const express = require("express")
const { check } = require("express-validator")
const router = express.Router()

const middleware = require("../../middleware")
const postController = require("../../controllers/post")

router.post("/", [
    check("text", "text is required").not().isEmpty()
], middleware, postController.createPost)

router.post("/comment/:id", middleware, postController.postComment)
router.put("/like/:id", middleware, postController.likePost)
router.put("/comment/:postId/:commentId", middleware, postController.updateComment)
router.get("/", middleware, postController.fetchAllPosts)
router.get("/:id", middleware, postController.fetchPostById)
router.delete("/:id", middleware, postController.removePost)

module.exports = router
