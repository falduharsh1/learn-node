const express = require('express')
const { user_controller } = require('../../../controller')

const user = express.Router()

// localhost:8000/api/v1/user/user-register
user.post(
    '/user-register',
    user_controller.user_register
)

module.exports = user