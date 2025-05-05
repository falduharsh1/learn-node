const { cloudinaryUploadImg, deleteCloudinaryImg } = require("../middleware/cloudinaryImg");
const Products = require("../models/product_modele");
const SubCategoryes = require("../models/subCategory_modele");
const fs = require("fs")
const { default: mongoose } = require("mongoose");


const getSubByCat = async (req, res) => {
    try {
        console.log("vvv", req.params.id);

        const subcat = await SubCategoryes.find({ category: req.params.id })

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

const searchProduct = async (req, res) => {
    try {
        console.log(req.query);

        const myobj = {}

        const { page, limit } = req.query

        const { category, rating, min, max } = req.query

        if (category) {
            myobj["category_id"] = parseInt(category)
        }

        if (rating) {
            // myobj["AvgRating"] = { $avg : parseFloat(rating)}
        }

        if (min || max) {
            myobj["Variant.attributes.Price"] = {}
        }

        if (min) {
            myobj["Variant.attributes.Price"].$gte = parseInt(min)
        }

        if (max) {
            myobj["Variant.attributes.Price"].$lte = parseInt(max)
        }

        console.log("myobj", myobj);

        let pipline = [
            {
                $lookup: {
                    from: "variant",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "Variant"
                }
            },
            {
                $unwind: "$Variant"
            },
            {
                $lookup: {
                    from: "review",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "Review"
                }
            },
            {
                $addFields: {
                    AvgRating: { $avg: "$Review.rating" }
                }
            },
            {
                $match: myobj
            },
            {
                $group: {
                    _id: "$_id",
                    category_id: { $first: "$category_id" },
                    subcategory_id: {
                        $first: "$subcategory_id"
                    },
                    name: { $first: "$name" },
                    variant: { $push: "$Variant.attributes" },
                    rating: { $first: "$AvgRating" }
                }
            },
            {
                $sort: { name: 1 },
            }
        ]

        let product;

        if (page && limit) {
            product = await Products.find().skip((page - 1) * limit).limit(limit)
        } else {
            product = await Products.find()
        }

        const searchProduct = await Products.aggregate(pipline)

        console.log(searchProduct);

    } catch (error) {

    }
}

const getAll_product = async (req, res) => {
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
                    $unwind: '$SubCat_data',
                },
                {
                    $unwind: '$Cat_data',
                },

                {
                    $project: {
                        id: 1,
                        Cat_name: '$Cat_data.name',
                        Sub_cat_name: '$SubCat_data.name',
                        Product_name: '$name'
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

        const { page, limit } = req.query

        let product;

        if (page && limit) {
            product = await Products.find().skip((page - 1) * limit).limit(limit)
        } else {
            product = await Products.find()
        }


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

const getProduct = async (req, res) => {
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

const addProduct = async (req, res) => {
    try {

        console.log('okAdd',);
        console.log(req.body, req.file);

         const productImg = await cloudinaryUploadImg(req.file.path, "product")
                
        console.log("productImg", productImg);

        const Product = await Products.create({ ...req.body, product_img: {url : productImg.url , public_id : productImg.public_id} })

        if (!Product) {
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
                data: Product,
                message: 'Data pass'
            })

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'unsuccessFull'
            })
    }

}

const putProduct = async (req, res) => {
    try {

        let product

        if (req.file) {
            const productobj = await Products.findById(req.params.id)

            // fs.unlinkSync(productobj.product_img, (err) => {
            //     if (err) {
            //         return res.status(400).json({
            //             success: false,
            //             data: [],
            //             message: 'error in delete product'
            //         })
            //     }
            // })

            await deleteCloudinaryImg(productobj.product_img.public_id)

            const productImg = await cloudinaryUploadImg(req.file.path, "product")
                
            console.log("productImg", productImg);

            product = await Products.findByIdAndUpdate(req.params.id, { ...req.body, product_img: {url : productImg.url , public_id : productImg.public_id} }, { new: true })

        } else {
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

const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id)

        await deleteCloudinaryImg(product.product_img.public_id)
        
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

const product_by_cat = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const Product_by_cat = await Products.aggregate(
            [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'cat_data'
                    }
                },
                {
                    $unwind: '$cat_data'
                },
                {
                    $match: {
                        category: new mongoose.Types.ObjectId(categoryId)
                    }
                },
                {
                    $project: {
                        cat_name: '$cat_data.name',
                        product_name: '$name',
                        description: '$description',
                        price: '$price'
                    }
                }
            ]

        )

        if (!Product_by_cat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting Product by Category'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: Product_by_cat,
                message: 'successFull'
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

const product_by_subcat = async (req, res) => {
    try {

        const subcategory = req.params.subcategory_id;

        const Product_by_subcat = await Products.aggregate(
            [
                {
                    $lookup: {
                        from: 'subcategoryes',
                        localField: 'subcategory',
                        foreignField: '_id',
                        as: 'SubcatData'
                    }
                },
                {
                    $unwind: '$SubcatData'
                },
                {
                    $match: {
                        subcategory: new mongoose.Types.ObjectId(subcategory)
                    }
                },
                {
                    $project: {
                        subCat_name: '$SubcatData.name',
                        subCat_desc: '$SubcatData.description',
                        product: '$name',
                        desc: '$description',
                        price: '$price'
                    }
                }
            ]
        )

        if (!Product_by_subcat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting Product by Subcategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: Product_by_subcat,
                message: 'successFull'
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

const new_add_product = async (req, res) => {
    try {

        const newProduct = await Products.aggregate(
            [
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: 3
                }
            ]
        )

        if (!newProduct) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting recently Product'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: newProduct,
                message: 'successFull'
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

const count_product_by_cat = async (req, res) => {
    try {
        const countProduct = await Products.aggregate(
            [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryData'
                    }
                },
                {
                    $unwind: '$categoryData'
                },
                {
                    $group: {
                        _id: '$categoryData._id',
                        name: { $first: '$categoryData.name' },
                        contProduct: { $sum: 1 }
                    }
                }
            ]
        )

        if (!countProduct) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in cont Product by Category'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: countProduct,
                message: 'successFull'
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

// -------------------------exam---------------------------------//

const highest_sales = async (req, res) => {
    try {
        const highestsales = await Products.aggregate(
            [
                {
                  $lookup: {
                    from: 'category',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'result'
                  }
                },
                {
                      $unwind: '$result'
                },
                {
                  $project: {
                    Cat_name : '$result.category_name',
                    amount : '$total_amount',
                  }
                },
                 {
                   $sort: {
                     amount: -1
                   }
                 },
                 {
                   $limit: 1
                 }
              ]
              
        )

        if (!highestsales) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in cont Product by Category'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: highestsales,
                message: 'successFull'
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

const revenue_subcategory = async (req, res) => {
    try {
        const subcategory_revenue = await Products.aggregate(
            [
                {
                    $lookup: {
                        from: 'subcategory',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: '$result'
                },
                {
                    $group: {
                        _id: '$_id',
                        total_revenue: {
                            $sum: {
                                $subtract: ['$total_amount', '$discount']
                            }
                        }
                    }
                },
                {
                    $project: {
                        total_revenue: 1
                    }
                }
            ]
        )

        if (!subcategory_revenue) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting highest review'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: subcategory_revenue,
                message: 'successFull'
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

const High_reviews = async (req, res) => {
    try {
        const products_review = await Products.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: '$result'
                },
                {
                    $sort: {
                        rating: -1
                    }
                },
                {
                    $limit: 1
                },
                {
                    $project: {
                        product_id: 1,
                        product_name: '$result.name',
                        description: '$result.description',
                        rating: 1,
                        comment: 1
                    }
                }
            ]
        )

        if (!products_review) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting highest review'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: products_review,
                message: 'successFull'
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

module.exports = {
    getSubByCat,
    listproduct,
    getProduct,
    addProduct,
    putProduct,
    deleteProduct,
    getAll_product,
    searchProduct,
    product_by_cat,
    product_by_subcat,
    new_add_product,
    count_product_by_cat,

    highest_sales,
    revenue_subcategory,
    High_reviews
}