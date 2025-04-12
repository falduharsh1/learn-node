const express = require('express')
const { user_controller } = require('../../../controller')
const passport = require('passport')
const Users = require('../../../models/users_modele')
const { generate_token } = require('../../../controller/users_controller')

const user = express.Router()

// localhost:8000/api/v1/user/user-register
user.post(
    '/user-register',
    user_controller.user_register
)

// localhost:8000/api/v1/user/user-login
user.post(
    '/user-login',
    user_controller.user_login
)

// localhost:8000/api/v1/user/generate-new-token
user.get(
    '/generate-new-token',
    user_controller.generate_new_token
)

// localhost:8000/api/v1/user/logout-user
user.post(
    '/logout-user',
    user_controller.logout_user
)

// localhost:8000/api/v1/user/check-auth
user.get(
    '/check-auth',
    user_controller.check_auth
)

user.get('/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

user.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {

        console.log("shhhh",req.user);

        if(req.user){
            const userData = await Users.findById(req.user._id).select('-password -refreshToken')

            const { accessToken, refreshToken } = await generate_token(req.user._id);

            console.log("login", accessToken, refreshToken);

            const options = {
                httpOnly: true,
                secure: true
            }

            return res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .redirect('http://localhost:3000');
        }
                
        
    });

// localhost:8000/api/v1/user/check-verification
user.post(
    '/check-verification',
    user_controller.check_verification
)

module.exports = user