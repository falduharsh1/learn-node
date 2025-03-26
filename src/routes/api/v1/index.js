const express = require('express')

const router = express.Router()

//localhost:8000/product
const product_route = require("./Product_route")
const category_route = require("./Category_route")
const subcategory_route = require("./SubCategory_route")
const coupon_route = require("./Coupon_route")
const customer_route = require("./customer_route")
const user_route = require("./users_route")

router.use('/product',product_route)
router.use('/category',category_route)
router.use('/subcategory',subcategory_route)
router.use('/coupon',coupon_route)
router.use('/customer',customer_route)
router.use('/user',user_route)



module.exports = router