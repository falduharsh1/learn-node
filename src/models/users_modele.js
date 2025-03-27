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
        required: true,
    },
    role : {
        type: String,
        required: true,
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