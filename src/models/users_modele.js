const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    name : {
        type: String,
        required: true,
        trim: true,
    },  
    email : {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    password : {
        type: String,
    },
    role : {
        type: String,
        required: true,
    },
    googleId : {
        type: String
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    refreshToken : {
        type: String,
    }
    
    },
    {
        timestamps : true,
        versionKey : false
    }  
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users