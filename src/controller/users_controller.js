// npm bcrypt download for creating hash password

//npm i jsonwebtoken for creating access token and refresh token

//npm i cookie-parser for creating cookie

//npm i nodemailer is used for send mail

//twilio is used for send otp and after verify otp ( used twilio website )

//npm i pdfmake is used for make pdf of user ( in npm pdfmake, go on github )


const bcrypt = require('bcrypt');
const Users = require("../models/users_modele")
var jwt = require('jsonwebtoken');
const sendMail = require('../utils/nodemailer');
const { sendOTP } = require('../utils/twilio');
const { verificationOTP } = require('../utils/twilio');
const Createpdf = require('../utils/pdfmake');

const generate_token = async (userId) => {
    try {
        const user = await Users.findById(userId)

        const accessToken = jwt.sign({
            _id: user._id,
            role: user.role,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

        const refreshToken = jwt.sign({
            _id: user._id,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

        console.log("genfunc", refreshToken);

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

            const otp = Math.floor(1000 + Math.random() * 9000);

            // sendMail(email,"Verify your fruitable acount",`Your OTP is : ${otp}`)

            sendOTP();

            return res.status(201)
                .json({
                    success: true,
                    data: userData,
                    message: 'successFully register , please verify otp'
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

        if (user.isVerify === false) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Please verify otp first'
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

        const { accessToken, refreshToken } = await generate_token(user._id);

        console.log("login", accessToken, refreshToken);

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

const generate_new_token = async (req, res) => {
    try {

        // console.log(req.cookies , req.headers.authorization.replace("Bearer "," "));

        const token = req.cookies.refreshToken || req.headers.authorization.replace("Bearer ", " ")

        console.log("token", token);

        if (!token) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Token Not Found'
                })
        }

        try {
            const verifyToken = jwt.verify(token, process.env.REFRESH_TOKEN)

            if (!verifyToken) {
                return res.status(400)
                    .json({
                        success: false,
                        data: [],
                        message: 'Not found'
                    })
            }

            console.log("_id :", verifyToken._id);

            const user = await Users.findById(verifyToken._id)

            console.log("user", user);

            if (user.refreshToken !== token) {
                return res.status(404)
                    .json({
                        success: false,
                        data: [],
                        message: 'Token not match'
                    })
            }

            if (!user) {
                return res.status(404)
                    .json({
                        success: false,
                        data: [],
                        message: 'user not found'
                    })
            }

            const userData = await Users.findById(user._id).select('-password -refreshToken')

            const { accessToken, refreshToken } = await generate_token(user._id);

            console.log("login", accessToken, refreshToken);

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
                    message: 'SuccessFully generate new token'
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

const logout_user = async (req, res) => {
    try {
        console.log(req.body._id);

        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                success: true,
                message: 'SuccessFully Logout'
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

const check_auth = async (req, res) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", " ")

        // console.log("token", token);

        if (!token) {
            return res.status(401)
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
                    message: 'Not verify'
                })
        }

        const userData = await Users.findById(verifyToken._id).select('-password -refreshToken')

        return res.status(200)
            .json({
                success: true,
                data: userData,
                message: 'SuccessFully authenticated'
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

const check_verification = async (req, res) => {

    try {
        const { otp, email } = req.body

        const verifyOTP = await verificationOTP(otp)

        if (verifyOTP === 'approved') {

            const user = await Users.findOne({ email: email })

            user.isVerify = true

            await user.save({ validateBeforeSave: true })

            const docDefinition = {
                content: [
                    { text: 'Tables', style: 'header' },
                    {
                        columns: [
                            { width: '*', text: '' },
                            {
                                style: 'tableExample',
                                width: 'auto',
                                table: {
                                    body: [
                                        ['Name', 'Email', 'Role'],
                                        [`${user.name}`, `${user.email}`, `${user.role}`]
                                    ]
                                }
                            },
                            { width: '*', text: '' },
                        ]
                    },
                    {
                        style: 'photo',
                        image: 'public/cat_img/Blueberry.jpg',
                        width: 150,
                        height: 150,
                    },
                    {
                        text: 'Blueberries are eaten fresh or used to make bakery goods and jams. They contain vitamin C, vitamin A, and iron. Blueberry bushes are found in woods and hilly areas of North America, Great Britain, northern Europe, and Asia. In the United States blueberries are grown in Maine, New Jersey', style: 'paragraph'
                    },
                ],

                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    photo: {
                        margin: [0, 0, 15, 10],
                        alignment: "center"
                    },
                    tableExample: {
                        alignment: "center",
                        margin: [0, 0, 15, 10]
                    },
                    paragraph: {
                        alignment: "center"
                    },
                },
            }

            Createpdf(docDefinition, user.name)

            return res.status(200)
                .json({
                    success: true,
                    message: 'verify successfully'
                })

        } else {
            return res.status(400)
                .json({
                    success: false,
                    message: 'otp not verify'
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

// const forgot_password = async (req,res) => {
//     try {
//         const {email} = req.body

//         console.log("REQ BODY:", req.body.email);

//         const user = await Users.findOne({email : email})

//         if(!user){
//             return res.status(400)
//             .json({
//                 success: false,
//                 data: [],
//                 message: 'not found email'
//             })
//         }

//         const otp = Math.floor(1000 + Math.random() * 9000);

//         await sendMail(email,"For Your Forgot Password ",`Your OTP is : ${otp}`)

//         return res.status(200)
//         .json({
//             success: true,
//             message: 'email send sucessfully'
//         })

//     } catch (error) {
//         return res.status(500)
//             .json({
//                 success: false,
//                 data: [],
//                 message: 'error in server' + error.message
//             })
//     }
// }   

module.exports = {
    user_register,
    user_login,
    generate_new_token,
    logout_user,
    check_auth,
    generate_token,
    check_verification,
    // forgot_password
}