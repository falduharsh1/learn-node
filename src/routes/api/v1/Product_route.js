const express = require('express');
const { Product_controller } = require('../../../controller');
const router = express.Router();

// localhost:4000/api/v1/product/get-product
router.get(
    '/get-product',
    Product_controller.getProduct
)

// localhost:4000/api/v1/product/post-product
router.post(
    '/post-product',
    Product_controller.addProduct
)

// localhost:4000/api/v1/product/put-product/:id
router.put(
    '/put-product/:id',
    Product_controller.putProduct
)

// localhost:4000/api/v1/product/delete-product/:id
router.delete(
    '/delete-product/:id',
    Product_controller.deleteProduct
)


module.exports = router
