const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExamUsers = require("../models/user_exam_modele")

const generate_token = async (userId) => {
    console.log("userId",userId);

    const user = await ExamUsers.findById(userId)

    const accessToken = jwt.sign({
        _id : user._id,
        role : user.role,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

      const refreshToken = jwt.sign({
        _id : user._id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
      
      user.refreshToken = refreshToken 

      await user.save({ validateBeforeSave: false })

      return {accessToken,refreshToken}
    
}

const user_register = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await ExamUsers.findOne({ email: email })

        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'email is already exist' 
                })
        }

        try {
            const hashpassword = await bcrypt.hash(password, 10)
            console.log(hashpassword);

            const user = await ExamUsers.create({...req.body, password: hashpassword })

            const UserData =  await ExamUsers.findById(user._id).select('-password')

            return res.status(200)
                .json({
                    success : true,
                    data : UserData,
                    message : "User data successFully add."
                })

        } catch (error) {
            return res.status(500)
                .json({
                    success: false,
                    data: [],
                    message: 'internal server error' + error.message
                })
        }

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'internal server error' + error.message
            })
    }
}

const user_login = async (req, res) => {
    try {
        const {email,password,} = req.body

        const user = await ExamUsers.findOne({ email: email })

        if(!user){
            return res.status(404)
                .json({
                    success : false,
                    data : [],
                    message : 'User is not found'
                })
        }

        const verify_hashpassword = await bcrypt.compare(password , user.password)

        if(!verify_hashpassword){
            return res.status(404)
                .json({
                    success : false,
                    data : [],
                    message : 'Not valid hashpassword'
                })
        }

        const {accessToken , refreshToken } = await generate_token(user._id)

        const UserData =  await ExamUsers.findById(user._id).select('-password -refreshToken')

        console.log("refreshToken",refreshToken);

        const option = {
            httpOnly : true,
            secure : true
        }

        console.log("access_token",accessToken);
        console.log("refresh_token",refreshToken);
        

        return res.status(200)
        .cookie("accessToken",accessToken,option)
        .cookie("refreshToken",refreshToken,option)
        .json({
            success : true,
            data : UserData,
            message : 'token created'
        })
        
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            data: [],
            message: 'internal server error' + error.message
        })
    }
}

const user_new_token =  async (req,res) => {
    try {

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
        
                    const user = await ExamUsers.findById(verifyToken._id)
        
                    console.log("user", user);
        
                    if(user.refreshToken !== token ){
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
        
                    const userData = await ExamUsers.findById(user._id).select('-password -refreshToken')
        
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
            message: 'internal server error' + error.message
        })
    }
}

const user_logout_user = async (req,res) => {
     try {
            console.log(req.body._id);
    
            const user = await ExamUsers.findByIdAndUpdate(
                req.body._id,
                {
                    $unset : {
                        refreshToken : 1
                    }
                },
                {
                    new : true
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
                message: 'SuccessFully clear'
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

const user_check_auth = async (req,res) => {
    try {
        const token = req.cookies.refreshToken || req.headers.authorization.replace("Bearer ", " ")
        
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

        const userData = await ExamUsers.findById(verifyToken._id).select('-password -refreshToken')
        
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

module.exports = {
    user_register,
    user_login,
    user_new_token,
    user_logout_user,
    user_check_auth
}