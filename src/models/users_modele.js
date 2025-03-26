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
    }
    },
    {
        timestamps : true,
        versionKey : false
    }  
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users