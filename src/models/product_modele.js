const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    { 
        subCategory_id :  { 
            type : mongoose.Types.ObjectId,
            ref : 'SubCategoryes',
            required : true     
        },
        name : { 
            type: String,
            required : true,
            trim : true,
            unique : true
        },
        description : { 
            type: String,
            required : true,
            trim : true,
        },
        product_img : {
            type: String,
            required : true,
        }
    },

    {
        timestamps : true,
        versionKey : false
    }
);

const Products = mongoose.model('Products', productSchema);

module.exports = Products
