const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema(
    {
        Coupon_code : {
            type: String, 
            required : true,
            trim : true,
            unique : true
        },

        discount : {
            type :  Number,
            required : true,
        },

        from : {
            type : Date,
            required : true,
        },

        to : {
            type : Date,
            required : true,
        },

        active : {
            type : Boolean,
            required : true,
        }

    },

    {
        timestamps : true,
        versionKey : false
    }
)

const Coupons = mongoose.model('Coupons',couponSchema);

module.exports = Coupons