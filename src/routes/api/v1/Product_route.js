const express = require('express');
const { Product_controller } = require('../../../controller');
const upload = require('../../../middleware/upload');
const router = express.Router();

//http://localhost:4000/api/v1/product/get-product
router.get(
    '/get-product',
    Product_controller.getProduct
)

//http://localhost:4000/api/v1/product/list-product
router.get(
    '/list-product',
    Product_controller.listproduct
)

router.get(
    '/getSubByCat/:id',
    Product_controller.getSubByCat
)

//http://localhost:4000/api/v1/product/post-product
router.post(
    '/post-product',
    upload.single('product_img'),
    Product_controller.addProduct
)

//http://localhost:4000/api/v1/product/put-product/:id
router.put(
    '/put-product/:id',
    upload.single('product_img'),
    Product_controller.putProduct
)

//http://localhost:4000/api/v1/product/delete-product/:id
router.delete(
    '/delete-product/:id',
    Product_controller.deleteProduct
)


module.exports = router
