const { error } = require("console");
const Categories = require("../models/category_modele");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const { cloudinaryUploadImg, deleteCloudinaryImg } = require("../middleware/cloudinaryImg");

const listCategory = async (req, res) => {
    try {
        const category = await Categories.find()

        if (!category) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'error in get all category'
            })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: 'getting all Category'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id)

        if (!category) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in get category'
            })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: 'category get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'error in server' + error.message
        })
    }
}

const CountCategory = async (req, res) => {
    try {
        const CountCat = await Categories.aggregate(
            [
                {
                    $count: 'Category No'
                }
            ]
        )

        if (!CountCat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'Not Count Category data'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: CountCat,
                message: 'Successfully Count Category Data'
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

const addCategory = async (req, res) => {
    try {

        console.log(req.body, req.file);

        const addImg = await cloudinaryUploadImg(req.file.path, "category")

        console.log("addImg", addImg);


        const category = await Categories.create({ ...req.body, cat_img: { url: addImg.url, public_id: addImg.public_id } })

        if (!category) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'unsuccessfull add category'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: category,
                message: 'Category add'
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

const putCategory = async (req, res) => {
    try {
        let category
        if (req.file) {

            const categoryObj = await Categories.findById(req.params.id)


            // fs.unlink(categoryObj.cat_img, (err) => {
            //     if (err) {
            //         return res.status(400).json({
            //             success: false,
            //             data: [],
            //             message: 'error in server' + err
            //         })
            //     }
            // })

            const updateImg = await cloudinaryUploadImg(req.file.path, "category")

            // category = await Categories.findByIdAndUpdate(req.params.id, { ...req.body, cat_img: req.file.path }, { new: true })

            category = await Categories.findByIdAndUpdate(req.params.id, { ...req.body, cat_img: { url: updateImg.url, public_id: updateImg.public_id } }, { new: true })

            deleteCloudinaryImg(categoryObj.cat_img.public_id)
            cloudinaryUploadImg(req.file.path, "category")

        } else {

            category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true })

        }

        if (!category) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in update category'
            })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: 'successfully category update'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        console.log(req.params.id);

        const category = await Categories.findByIdAndDelete(req.params.id)

        console.log(category);

        await deleteCloudinaryImg(category.cat_img.public_id)

        if (!category) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in delete category'
            })
        }

        // fs.unlink(category.cat_img, (err) => {
        //     if (err) {
        //         return res.status(400).json({
        //             success: false,
        //             data: null,
        //             message: 'image delete'
        //         })
        //     }
        // })

        return res.status(200).json({
            success: true,
            data: category,
            message: 'category delete successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const CountActive = async (req, res) => {
    try {
        const ActiveUser = await Categories.aggregate(
            [
                {
                    $match: {
                        isActive: 'true'
                    }
                },
                {
                    $count: 'ActiveUser'
                }
            ]
        )

        if (!ActiveUser) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: ActiveUser,
                message: 'Successfully Count active user'
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

const mostProducts = async (req, res) => {
    try {
        const mostProduct = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category',
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
                        Cat_name: '$name',
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
                    message: 'error in getting most product'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: mostProduct,
                message: ' Successfull getting most product'
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

const averageProducts = async (req, res) => {
    try {

    } catch (error) {

    }
}

const inactive = async (req, res) => {
    try {
        const inActiveUser = await Categories.aggregate(
            [
                {
                    $match: {
                        isActive: 'false'
                    }
                },
                {
                    $count: 'InActiveUser'
                }
            ]
        )

        if (!inActiveUser) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: inActiveUser,
                message: 'Successfully Count Inactive user'
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

const countSubcategories = async (req, res) => {
    try {
        const CountSubCat = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: 'subcategoryes',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'subCat_data'
                    }
                },
                {
                    $project: {
                        name: 1,
                        SubCatCount: { $size: '$subCat_data' }
                    }
                }
            ]
        )

        if (!CountSubCat) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in count subcategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: CountSubCat,
                message: 'Count subcategory successFull'
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

const SubCat_by_CatID = async (req, res) => {
    try {
        console.log(req.params.id);

        // let ids = req.params.id

        const subcat_catId = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "subcategoryes",
                        localField: "_id",
                        foreignField: "category",
                        as: "subcatData"
                    }
                },
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    $project: {
                        cat_name: "$name",
                        subCat_name: "$subcatData.name"
                    }
                }
            ]
        )

        if (!subcat_catId) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'error in getting subcategory'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: subcat_catId,
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
    listCategory,
    getCategory,
    addCategory,
    putCategory,
    deleteCategory,
    CountCategory,
    CountActive,
    mostProducts,
    averageProducts,
    inactive,
    countSubcategories,
    SubCat_by_CatID
}

// [
//     {
//       $lookup: {
//         from: 'subcategoryes',
//         localField: '_id',
//         foreignField: 'category',
//         as: 'subcatData'
//       }
//     },
//     {
//       $match: {
//            _id : ObjectId('67a57c177b77d70a4508634d')
//       }
//     },
//           {
//             $project: {
//               cat_name : '$name',
//               subCat_name : '$subcatData.name'
//             }
//           }
//   ]