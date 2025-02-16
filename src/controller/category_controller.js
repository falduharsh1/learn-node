const Categories = require("../models/category_modele");
const fs = require("fs")
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

const addCategory = async (req, res) => {
    try {

        console.log(req.body, req.file);

        const category = await Categories.create({ ...req.body, cat_img: req.file.path })

        if (!category) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'unsuccessfull'
                })
        }

        return res.status(200)
            .json({
                success: true,
                data: category,
                message: 'Data Pass'
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
            

            fs.unlink(categoryObj.cat_img, (err) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: [],
                        message: 'error in server' + err
                    })
                }
            })
            
            
             category = await Categories.findByIdAndUpdate( req.params.id, {...req.body , cat_img:req.file.path}, { new: true })


        } else {

             category = await Categories.findByIdAndUpdate( req.params.id, req.body, { new: true })

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

        if (!category) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'error in delete category'
            })
        }

        fs.unlink(category.cat_img, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: 'image delete'
                })
            }
        })

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

module.exports = {
    listCategory,
    getCategory,
    addCategory,
    putCategory,
    deleteCategory
}