const mongoose = require("mongoose")
const schema = mongoose.Schema

const profileSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    skills: [String],
    socialMedia: {
        linkedin: {
            type: String
        },
        facebook: {
            type: String
        }
    }
})

module.exports = Profile = mongoose.model("profile", profileSchema)
