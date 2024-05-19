const { validationResult } = require("express-validator")

const User = require("../../models/User")
const Post = require("../../models/Post")

const postController = {
    createPost: async(req, res) => {
        try {
            const{ text } = req.body

            const validationErrors = validationResult(req)
            if(!validationErrors.isEmpty()) {
                console.log(validationErrors.errors)

                if(validationErrors.errors.length > 0) {
                    const errorMsg = validationErrors.errors.map((error) => error.msg)
                    console.log(errorMsg)

                    return res.status(403).send({errorMsg})
                }
            }

            const user = await User.findById(req.userId).select("name")
            const post = new Post({
                user: req.userId,
                name: user.name,
                text: text
            })
            await post.save()

            return res.status(200).send({"message": "post creation successful", "postData": post})
        }
        catch(error) {
            return res.status(400).send({"message": "post creation encountered an error", "error": error.message})
        }
    },

    postComment: async(req, res) => {
        try {
            const{ comment } = req.body

            const post = await Post.findById(req.params.id)
            const user = await User.findById(req.userId).select("-password") //"-password", do not select password

            if(!post) {
                return res.status(404).send({"message": "page not found"})
            }

            const newComment = {
                user: user.id,
                name: user.name,
                text: comment
            }

            post.comments.unshift(newComment)
            await post.save()

            return res.status(200).send({"message": "comment entry successful", "commentData": post})
        }
        catch(error) {
            return res.status(400).send({"message": "comment entry encountered an error", "error": error.message})
        }
    },

    likePost: async(req, res) => {
        try {
            const{ reactionType } = req.body

            const post = await Post.findById(req.params.id)

            if(!post) {
                return res.status(404).send({"message": "page not found"})
            }

            // unlike logic, if already liked
            const likedByUser = post.likes.filter((like) => like.user.toString() === req.userId)
            if(likedByUser.length > 0) {
                const index = post.likes.findIndex((value) => value.user === req.userId)
                post.likes.splice(index, 1)
            }
            else {
                // like logic
                post.likes.unshift({user: req.userId, "reactionType": reactionType})
            }
            await post.save()

            return res.status(200).send({"message": "liked", "reactionData": post})
        }
        catch(error) {
            return res.status(400).send({"message": "reaction encountered an error", "error": error.message})
        }
    },

    updateComment: async(req, res) => {
        try {
            const{ comment } = req.body

            const post = await Post.findById(req.params.postId)
            if(!post) {
                return res.status(404).send({"message": "page not found"})
            }

            const existingComment = post.comments.find((comment) => comment._id.toString() === req.params.commentId)
            if(!existingComment) {
                return res.status(404).send({"message": "comment not found"})
            }

            if(req.userId !== existingComment.user.toString()) {
                return res.status(401).send({"message": "comment updating restricted to the author"})
            }

            existingComment.text = comment
            await post.save()

            return res.status(200).send({"message": "comment update successful", "commentData": post})
        }
        catch(error) {
            return res.status(400).send({"message": "comment update encountered an error", "error": error.message})
        }
    },

    fetchAllPosts: async(req, res) => {
        try {
            const posts = await Post.find().sort({date: -1})

            return res.status(200).send({"message": "all records retrieval successful", "allPosts": posts})
        }
        catch(error) {
            return res.status(400).send({"message": "all records retrieval encountered an error", "error": error.message})
        }
    },

    fetchPostById: async(req, res) => {
        try {
            const{ id } = req.params

            const post = await Post.findOne({_id: id})

            return res.status(200).send({"message": "record retrieval successful", "post": post})
        }
        catch(error) {
            return res.status(400).send({"message": "record retrieval encountered an error", "error": error.message})
        }
    },

    removePost: async(req, res) => {
        try {
            const{ id } = req.params

            const post = await Post.findOne({_id: id})

            if(post.user.toString() !== req.userId) {
                return res.status(401).send({"message": "post deleting restricted to the author"})
            }

            await Post.findByIdAndDelete(id)

            return res.status(200).send({"message": "post deletion successful"})
        }
        catch(error) {
            return res.status(400).send({"message": "post deletion encountered an error", "error": error.message})
        }
    }
}

module.exports = postController
