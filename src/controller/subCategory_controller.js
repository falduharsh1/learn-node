const { deleteCloudinaryImg, cloudinaryUploadImg } = require("../middleware/cloudinaryImg");
const SubCategoryes = require("../models/subCategory_modele");
const fs = require("fs")

const listSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategoryes.find()

        if (!subcategory) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'error in get all subcategory'
            })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: 'getting all subcategory'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }
}

const get_data_SubCategory = async (req, res) => {
    try {
        const GetSub = await SubCategoryes.aggregate(
            [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'CatData'
                    }
                },
                {
                    $unwind: '$CatData'
                },
                {
                    $project: {
                        id: 1,
                        Cat_name: '$CatData.name',
                        SubCat_name: '$name'
                    }
                }
            ]
        )

        if (!GetSub) {
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
                data: GetSub,
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

const getSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategoryes.findById(req.params.id)

        if (!subcategory) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in get subcategory'
            })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: 'subcategory get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }

}

const addSubCategory = async (req, res) => {
    try {

        console.log("req.body, req.file",req.body, req.file);

         const addImg = await cloudinaryUploadImg(req.file.path, "subcategory")
        
         console.log("addImg", addImg);

        const subCategory = await SubCategoryes.create({ ...req.body, subCat_img: { url: addImg.url, public_id: addImg.public_id } })

        if (!subCategory) {
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
                data: subCategory,
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

const putSubCategory = async (req, res) => {
    try {

        console.log('bodyy', req.body);

        let Subcategory

        if (req.file) {
            const subCategoryObj = await SubCategoryes.findById(req.params.id)

            // fs.unlinkSync(subCategoryObj.subCat_img, (err) => {
            //     if (err) {
            //         return res.status(400).json({
            //             success: false,
            //             data: [],
            //             message: 'error in delete Subcategory'
            //         })
            //     }
            // })

            await deleteCloudinaryImg(subCategoryObj.subCat_img.public_id)

            const updateImg = await cloudinaryUploadImg(req.file.path, "subcategory")
        
            console.log("addImg", updateImg);

            Subcategory = await SubCategoryes.findByIdAndUpdate(req.params.id, { ...req.body, subCat_img: { url: updateImg.url, public_id: updateImg.public_id } }, { new: true })

        } else {
            Subcategory = await SubCategoryes.findByIdAndUpdate(req.params.id, req.body, { new: true })

        }

        if (!Subcategory) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in update Subcategory'
            })
        }

        return res.status(200).json({
            success: true,
            data: Subcategory,
            message: 'successfully Subcategory update '
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }

}

const deleteSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategoryes.findByIdAndDelete(req.params.id)

        await deleteCloudinaryImg(subcategory.subCat_img.public_id)

        if (!subcategory) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in delete Subcategory'
            })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: 'Subcategory delete successfully'
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }

}

const activeSubCategory = async (req, res) => {
    try {
        const activesubCat = await SubCategoryes.aggregate(
            [
                {
                    $match: {
                        isActive: 'true'
                    }
                },
                {
                    $count: 'ActiveSubCategory'
                }
            ]
        )

        if (!activesubCat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'erorr in getting active sucategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: activesubCat,
                message: 'successfull to get active subcategory'
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

const mostSubCategory = async (req, res) => {
    try {
        const mostProduct = await SubCategoryes.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'subcategory',
                        as: 'productData'
                    }
                },
                {
                    $addFields: {
                        products: { $size: '$productData' }
                    }
                },
                {
                    $project: {
                        subCat_name: '$name',
                        products: 1
                    }
                },
                {
                    $sort: {
                        products: -1
                    }
                },
                {
                    $limit: 1
                }
            ]
        )

        if (!mostProduct) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'erorr in getting Inactive sucategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: mostProduct,
                message: 'successfull to get Inactive subcategory'
            })
    } catch (error) {

    }
}

const InactiveSubCategory = async (req, res) => {
    try {
        const inactiveSubcat = await SubCategoryes.aggregate(
            [
                {
                    $match: {
                        isActive: 'false'
                    }
                },
                {
                    $count: 'InActiveSubCategory'
                }
            ]
        )

        if (!inactiveSubcat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'erorr in getting Inactive sucategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: inactiveSubcat,
                message: 'successfull to get Inactive subcategory'
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

const countProducts = async (req, res) => {
    try {
        const count_product = await SubCategoryes.aggregate(
            [
                {
                  $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'subcategory',
                    as: 'productData'
                  }
                },
                {
                  $project: {
                    subCat_name : '$name',
                    product_count : {$size : '$productData'}
                  }
                }
              ]
        )

        if (!count_product) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'erorr in count product for each subcategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: count_product,
                message: 'successfull to count product for each subcategory'
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
    getSubCategory,
    listSubCategory,
    addSubCategory,
    putSubCategory,
    deleteSubCategory,
    get_data_SubCategory,
    activeSubCategory,
    mostSubCategory,
    InactiveSubCategory,
    countProducts
}