const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    { 
        subcategory :  { 
            type : mongoose.Types.ObjectId,
            ref : 'SubCategoryes',
        },
        category : {
            type : mongoose.Types.ObjectId,
            ref : 'Categories',
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
        price : {
            type : Number,
            required : true,
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
