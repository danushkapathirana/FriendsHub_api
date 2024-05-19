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
    }
}

module.exports = postController
