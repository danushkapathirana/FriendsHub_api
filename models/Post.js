const mongoose = require("mongoose")
const schema = mongoose.Schema

const postSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            reactionType: {
                type: String
            }
        }
    ],
    comments: [
        {
            user: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model("post", postSchema)
