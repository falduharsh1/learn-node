const express = require('express');
const { User_exam_controller } = require('../../../controller');

const user = express.Router();

// localhost:8000/api/v1/user_exam/user-register
user.post(
    '/user-register',
    User_exam_controller.user_register
)

// localhost:8000/api/v1/user_exam/user-login
user.post(
    '/user-login',
    User_exam_controller.user_login
)

// localhost:8000/api/v1/user_exam/user-new-token
user.get(
    '/user-new-token',
    User_exam_controller.user_new_token
)

// localhost:8000/api/v1/user_exam/user-logout-user
user.post(
    '/user-logout-user',
    User_exam_controller.user_logout_user
)

// localhost:8000/api/v1/user_exam/user-check-auth
user.get(
    '/user-check-auth',
    User_exam_controller.user_check_auth

)

module.exports = user
