const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    { 
        product_id :  { 
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
        }
    },

    {
        timestamps : true,
        versionKey : false
    }
);

const Products = mongoose.model('Products', productSchema);

module.exports = Products
