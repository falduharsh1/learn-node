const express = require('express')
const { Coupon_controller } = require('../../../controller');

const coupon = express.Router()

// localhost:8000/api/v1/coupon/get-coupon/:id
coupon.get(
    '/get-coupon/:id',
    Coupon_controller.getCoupon
)

// localhost:8000/api/v1/coupon/get-coupon
coupon.get(
    '/get-coupon',
    Coupon_controller.listCoupon
)

// localhost:8000/api/v1/coupon/post-coupon
coupon.post(
    '/post-coupon',
    Coupon_controller.addCoupon
)

// localhost:8000/api/v1/coupon/put-coupon/:id
coupon.put(
    '/put-coupon/:id',
    Coupon_controller.putCoupon
)

// localhost:8000/api/v1/coupon/delete-coupon/:id
coupon.delete(
    '/delete-coupon/:id',
    Coupon_controller.deleteCoupon
)

module.exports = coupon

