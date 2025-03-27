// npm bcrypt download for creating hash password

//npm i jsonwebtoken for creating access token and refresh token

//npm i cookie-parser for creating cookie

const bcrypt = require('bcrypt');
const Users = require("../models/users_modele")
var jwt = require('jsonwebtoken');

const generate_token = async (userId) => {
    try {
        
    const user = await Users.findById(userId)

    const accessToken = jwt.sign({
        id: user._id,
        role: user.role,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    const refreshToken = jwt.sign({
        id: user._id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    console.log("genfunc",  refreshToken);

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

    } catch (error) {
        console.log(error);
        
    }
}


const user_register = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(email, password);

        const user = await Users.findOne({ email: email })

        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'user email is already exist'
                })
        }

        try {

            const hashPassword = await bcrypt.hash(password, 10)
            console.log(hashPassword);

            const User = await Users.create({ ...req.body, password: hashPassword })

            const userData = await Users.findById(User._id).select('-password ')

            return res.status(201)
                .json({
                    success: true,
                    data: userData,
                    message: 'successFull data add'
                })

        } catch (error) {
            return res.status(500)
                .json({
                    success: false,
                    data: [],
                    message: 'error in server' + error.message
                })
        }


    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'error in server' + error.message
            })
    }
}

const user_login = async (req, res) => {
    try {
        const { email, password, role } = req.body

        console.log(email, password);

        const user = await Users.findOne({ email: email })

        if (!user) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'user is not found'
                })
        }

        const match_password = await bcrypt.compare(password, user.password)

        if (!match_password) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: ' Invalid Password'
                })
        }

        const userData = await Users.findById(user._id).select('-password -refreshToken')

        const { accessToken, refreshToken } =  await generate_token(user._id);

        console.log("login",accessToken, refreshToken);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                data: userData,
                message: 'Login successFully'
            })

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'error in server' + error.message
            })
    }
}

const user_new_token = async (req, res) => {
    // try {
    //     const {accessToken,refreshToken,email} = req.body

    //     const user = await Users.findOne({ email: email })

    //     if (!user) {
    //         return res.status(400)
    //             .json({
    //                 success: false,
    //                 data: [],
    //                 message: 'user is not found'
    //             })
    //     }

    //     const token_verify = await bcrypt.compare(accessToken , user.accessToken) 

    //     if (!token_verify) {
    //         return res.status(400)
    //             .json({
    //                 success: false,
    //                 data: [],
    //                 message: ' Invalid token'
    //             })
    //     }
    // } catch (error) {
    //     return res.status(500)
    //     .json({
    //         success: false,
    //         data: [],
    //         message: 'error in server' + error.message
    //     })
    // }

}

module.exports = {
    user_register,
    user_login,
    user_new_token
}