const Categories = require("../models/category_modele");

const getCategory = (req,res) => {
    try {
        res.send('Get a Category')
    } catch (error) {
        console.log(error);
    }
}

const addCategory = async (req,res) => {
    try {

        console.log(req.body , req.file );
        
        const category = await Categories.create({...req.body , cat_img : req.file.path})
         
        if(!category){
            return res.status(400)
            .json({
                success : false,
                data : [],
                message : 'unsuccessfull'
            })
        }

        return res.status(200)
        .json({
            success : true,
            data : category,
            message : 'Data Pass'
        })

    } catch (error) {
        return res.status(500)
        .json({
            success : false,
            data : [],
            message : 'error in server' + error.message
        })
    }
}

const putCategory = (req,res) => {
    try {
        res.send('Put a Category')
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory = (req,res) => {
    try {
        res.send('Delete a Category')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategory,
    addCategory,
    putCategory,
    deleteCategory
}