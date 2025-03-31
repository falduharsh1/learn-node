const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExamUsers = require("../models/user_exam_modele")

const generate_token = async (userId) => {
    console.log("userId",userId);

    const user = await ExamUsers.findById(userId)

    const access_token = jwt.sign({
        _id : user._id,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

      const refresh_token = jwt.sign({
        _id : user._id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
      
      user.refresh_token = refresh_token 

      return {access_token,refresh_token}
    
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

        const {access_token , refresh_token } = await generate_token(user._id)

        const UserData =  await ExamUsers.findById(user._id).select('-password -refresh_token')

        console.log("refresh_token",refresh_token);

        const option = {
            httpOnly : true,
            secure : true
        }

        console.log("access_token",access_token);
        console.log("refresh_token",refresh_token);
        

        return res.status(200)
        .cookie("access_token",access_token,option)
        .cookie("refresh_token",refresh_token,option)
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

        // console.log(req.headers.authorization.replace("Bearer "," "));
        
        const token =  req.headers.authorization.replace("Bearer "," ")

        console.log("token",token);

        if(!token){
            return res.status(400)
            .json({
                success: false,
                message: 'not found'
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

module.exports = {
    user_register,
    user_login,
    user_new_token
}