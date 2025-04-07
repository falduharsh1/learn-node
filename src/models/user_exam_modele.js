const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true
        },
        email : {
            type : String,
            require : true,
            trim : true,
            unique : true
        },
        password : {
            type : String,
            require : true,
            trim : true
        },
        role : {
            type : String,
            require : true,
        },
        refreshToken : {
            type : String,
        },
        
    },
    {
        timestamps : true,
        versionKey : false
    }
)

const ExamUsers = mongoose.model('ExamUsers', UserSchema);

module.exports = ExamUsers