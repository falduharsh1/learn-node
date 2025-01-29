const Products = require("../models/product_modele");

const getProduct= (req,res) => {
    try {
        res.send('Get a Product')
    } catch (error) {
        console.log(error);
    }

}

const addProduct = async (req,res) => {
    try {

        console.log(req.body, req.file);
        
        const Product = await Products.create({...req.body , product_img : req.file.path})

        if(!Product){
            return res.status(400)
            .json({
                success : false,
                data : [],
                message : 'unsuccessFull'
            })
        }

        return res.status(200)
       .json({
            success : true,
            data : Product,
            message : 'Data pass'
       })

    } catch (error) {
        return res.status(500)
            .json({
                success : false,
                data : [],
                message : 'unsuccessFull'
            })
    }

}

const putProduct= (req,res) => {
    try {
        res.send('Put a Product')
    } catch (error) {
        console.log(error);
    }

}

const deleteProduct= (req,res) => {
    try {
        res.send('Delete a Product')
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getProduct,
    addProduct,
    putProduct,
    deleteProduct
}