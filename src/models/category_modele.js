const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
    name : {
        type: String,
        required: true,
        trim: true,
        unique : true
    },  
    description : {
        type: String,
        required: true,
        trim: true
    },
    cat_img : {
        type: String,
        required: true,
    }
},
    {
        timestamps : true,
        versionKey : false
    }
);

const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories