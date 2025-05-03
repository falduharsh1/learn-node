const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
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
            type: {
                public_id: String,
                url: String
            }
        }
    },

    {
        timestamps : true,
        versionKey : false
    }
    
);

const SubCategoryes = mongoose.model('SubCategoryes', subCategorySchema);

module.exports = SubCategoryes