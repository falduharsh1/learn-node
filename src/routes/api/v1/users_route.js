const express = require('express')
const { user_controller } = require('../../../controller')
const passport = require('passport')

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
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = user