const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = User = mongoose.model("user", userSchema)
