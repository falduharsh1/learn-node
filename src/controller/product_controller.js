const Products = require("../models/product_modele");
const SubCategoryes = require("../models/subCategory_modele");
const fs = require("fs")


const getSubByCat = async (req, res) => {
    try {
        console.log("vvv",req.params.id);   
        
        const subcat = await SubCategoryes.find({category: req.params.id})

        if (!subcat) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'error in get all product'
            })
        }

        return res.status(200).json({
            success: true,
            data: subcat,
            message: 'getting all product'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })        
    }
}

const getAll_product = async (req,res) => {
    try {
        const GetProduct = await Products.aggregate(
            [
                {
                    $lookup: {
                      from: 'subcategoryes',
                      localField: 'subcategory',
                      foreignField: '_id',
                      as: 'SubCat_data'
                    }
                  },
   						{
								$lookup: {
								  from: 'categories',
								  localField: 'category',
								  foreignField: '_id',
								  as: 'Cat_data'
								}
              },
                {
                  $unwind:'$SubCat_data',
                },
  						  {
                  $unwind:'$Cat_data',
                },
   
                {
                  $project: {
                    id : 1,
                    Cat_name : '$Cat_data.name' , 
                    Sub_cat_name : '$SubCat_data.name',
                    Product_name : '$name'
                  }
                }
              ]
        )

        if (!GetProduct) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'Not Get Data'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: GetProduct,
                message: 'Successfully Data Get'
            })
            
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'error in server' + error.message
            })
    }
}


const listproduct = async (req, res) => {
    try {
        console.log('okk',);
        
        const product = await Products.find() 

        if (!product) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'error in get all product'
            })
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: 'getting all product'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })        
    }
}

const getProduct= async(req,res) => {
    try {
        const product = await Products.findById(req.params.id)

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in get product'
            })
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: 'product get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }

}

const addProduct = async (req,res) => {
    try {

        console.log('okAdd',);
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

const putProduct = async (req,res) => {
    try {

        let product

        if(req.file){
                const productobj = await Products.findById(req.params.id)

            fs.unlinkSync(productobj.product_img , (err) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        data: [],
                        message: 'error in delete product'
                    })
                }
            })

            product = await Products.findByIdAndUpdate(req.params.id, {...req.body , product_img : req.file.path}, { new: true })

        }else{
            product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })

        }

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in update product'
            })
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: 'successfully product update '
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }

}

const deleteProduct = async (req,res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in delete product'
            })
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: 'product delete successfully'
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
    getSubByCat,
    listproduct,
    getProduct,
    addProduct,
    putProduct,
    deleteProduct,
    getAll_product
}