const express = require('express')
const { user_controller } = require('../../../controller')

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

// localhost:8000/api/v1/user/user-new-token
user.post(
    '/user-new-token',
    user_controller.user_new_token
)

module.exports = user