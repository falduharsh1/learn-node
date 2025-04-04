const Users = require("../models/users_modele")
var jwt = require('jsonwebtoken');

const auth = (role) => async (req, res, next) => {

    try {
        const token = req.cookies.accessToken || req.headers.authorization.replace(("Bearer ", ""))

        console.log("token", token);

        if (!token) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Token Not Found'
                })
        }

        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN)
        
                    if (!verifyToken) {
                        return res.status(400)
                            .json({
                                success: false,
                                data: [],
                                message: 'Not found'
                            })
                    }

        if(!role.includes(verifyToken.role)){
            return res.status(400)
                .json({
                    success: false,
                    message: 'you are not accessible'
                })
        }

        const user = await Users.findById(verifyToken._id).select('-password -refreshToken')

        if (!user) {
            return res.status(404)
                .json({
                    success: false,
                    data: [],
                    message: 'user not found'
                })
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'error in server' + error.message
            })
    }

    

}

module.exports = auth