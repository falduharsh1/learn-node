var jwt = require('jsonwebtoken');
const ExamUsers = require('../models/user_exam_modele');


const auth = (role) => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization.replace("Bearer ", " ")

        console.log("token", token);

        if (!token) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Token Not Found'
                })
        }

        const verifyToken = await jwt.verify(token, process.env.ACCESS_TOKEN)

        if (!verifyToken) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'Not found'
                })
        }

        console.log(verifyToken.role,role );
        

        if (!role.includes(verifyToken.role)) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'you are not accesible'
                })
        }

        const user = await ExamUsers.findById(verifyToken._id).select('-password -refreshToken')

        if (!user) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'Not found'
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