const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        category_id :  { 
            type : mongoose.Types.ObjectId,
            ref : 'Categories',
        },
        category : {
            type : mongoose.Types.ObjectId,
            ref : 'Categories',
        },
        name :  { 
            type: String, 
            required : true,
            trim : true,
            unique : true
        },
        description : {
            type: String, 
            required : true ,
            trim : true,
        },
        subCat_img : {
            type: String,
            required: true,
        }
    },

    {
        timestamps : true,
        versionKey : false
    }
    
);

const SubCategoryes = mongoose.model('SubCategoryes', subCategorySchema);

module.exports = SubCategoryes