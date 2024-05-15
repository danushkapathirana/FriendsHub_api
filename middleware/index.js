const config = require("config")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("auth")

    if(!token) {
        return res.status(401).send({"message": "authorization not allowed"})
    }

    try {
        const payLoad = jwt.decode(token, config.get("jwt_key"))
        req.userId = payLoad.user.id //assign decoded "user.id" to the request object | {user: {"id": user._id}}
        next()
    }
    catch(error) {
        return res.status(401).send({"message": "token is invalid"})
    }
}
