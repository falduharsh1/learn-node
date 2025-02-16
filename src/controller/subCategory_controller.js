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

            console.log(req.body, req.file);

            const subCategory = await SubCategoryes.create({ ...req.body, subCat_img: req.file.path })

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

            console.log('bodyy',req.body);
            
            let Subcategory

            if(req.file){
                    const subCategoryObj = await SubCategoryes.findById(req.params.id)

                fs.unlinkSync(subCategoryObj.subCat_img , (err) => {
                    if(err){
                        return res.status(400).json({
                            success: false,
                            data: [],
                            message: 'error in delete Subcategory'
                        })
                    }
                })

                Subcategory = await SubCategoryes.findByIdAndUpdate(req.params.id, {...req.body , subCat_img : req.file.path}, { new: true })

            }else{
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

    module.exports = {
        getSubCategory,
        listSubCategory,
        addSubCategory,
        putSubCategory,
        deleteSubCategory
    }