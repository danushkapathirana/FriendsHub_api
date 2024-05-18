const { validationResult } = require("express-validator")

const Profile = require("../../models/Profile")

const profileController = {
    createAndUpdateProfile: async(req, res) => {
        try {
            const{ bio, location, skills, linkedin, facebook } = req.body

            const validationErrors = validationResult(req)
            if(!validationErrors.isEmpty()) {
                console.log(validationErrors.errors)

                if(validationErrors.errors.length > 0) {
                    const errorMsg = validationErrors.errors.map((error) => error.msg)
                    console.log(errorMsg)

                    return res.status(403).send({errorMsg})
                }
            }

            const profileObject = {}
            profileObject.user = req.userId //"userId" extracts from the middleware level

            if(bio) profileObject.bio = bio
            if(location) profileObject.location = location

            profileObject.skills = []
            if(skills) {
                profileObject.skills = skills.split(" ").map((skill) => skill.trim())
            }

            profileObject.socialMedia = {}
            if(linkedin) profileObject.socialMedia.linkedin = linkedin
            if(facebook) profileObject.socialMedia.facebook = facebook

            let profile = await Profile.findOne({user: req.userId})

            // update an existing profile, if found
            if(profile) {
                profile = await Profile.findOneAndUpdate({user: req.userId}, {$set: profileObject}, {new: true})
                return res.status(200).send({"message": "profile update successful", "profileData": profile})
            }

            // create a new profile, if not found any existing profile
            profile = new Profile(profileObject)
            await profile.save()
            return res.status(200).send({"message": "profile creation successful", "profileData": profile})
        }
        catch(error) {
            return res.status(400).send({"message": "profile creation encountered an error", "error": error.message})
        }
    },

    createEducation: async(req, res) => {
        try {
            const{ school, degree, from, to, description } = req.body

            const educationObject = {}
            if(school) educationObject.school = school
            if(degree) educationObject.degree = degree
            if(from) educationObject.from = from
            if(to) educationObject.to = to
            if(description) educationObject.description = description

            const profile = await Profile.findOne({user: req.userId})
            profile.education.unshift(educationObject) //set the recent education entry at the first element of the array
            await profile.save()

            return res.status(200).send({"message": "education entry successful", "educationData": profile})
        }
        catch(error) {
            return res.status(400).send({"message": "education entry encountered an error", "error": error.message})
        }
    }
}

module.exports = profileController
