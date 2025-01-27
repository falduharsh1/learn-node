const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        category_id :  { 
            type : mongoose.type.ObjectId,
            ref : Categories,
            required : true 
        },
        name :  { 
            type: String, 
            required : true ,
            trim : true,
            unique : true
        },
        description : {
            type: String, 
            required : true ,
            trim : true,
        }
    },

    {
        timestamps : true,
        versionKey : false
    }
    
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory