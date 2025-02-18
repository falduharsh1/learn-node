const fs = require("fs")
const Coupons = require("../models/coupon_modele")

const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupons.findById(req.params.id)

        if (!coupon) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in get coupon'
            })
        }

        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'coupon get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }
}

const listCoupon = async (req, res) => {
    try {
        const coupon = await Coupons.find()

        if(!coupon){
            return res.status(400).json({
                success: false,
                data: null,
                message: 'error in get all Coupon'
            })
        }

        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'getting all coupon'
        })
        
    } catch (error) {
        return res.status(200).json({
            success: true,
            data: null,
            message: 'error in server' + error.message
        })
    }
}

const addCoupon = async (req, res) => {
    try {

        console.log(req.body, req.file);

        const coupon = await Coupons.create({ ...req.body })

        if (!coupon) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'unsuccessFull'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: coupon,
                message: 'Data pass'
            })

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'server error' + error.message
            })
    }
}

const putCoupon = async (req, res) => {
    try {
       const coupon = await Coupons.findByIdAndUpdate( req.params.id, req.body, { new: true })

        if (!coupon) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in update coupon'
            })
        }

        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'successfully coupon update'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const deleteCoupon= async (req, res) => {
    try {
        const coupon = await Coupons.findByIdAndDelete(req.params.id)

        if (!coupon) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in delete coupon'
            })
        }

        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'coupon delete successfully'
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

module.exports = {
    listCoupon,
    getCoupon,
    addCoupon,
    putCoupon,
    deleteCoupon
}