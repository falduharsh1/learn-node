const SubCategoryes = require("../models/subCategory_modele");

const getSubCategory = (req,res) => {
    try {
        res.send('Get a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

const addSubCategory = async (req,res) => {
    try {

        console.log(req.body);
       const subCategory = await SubCategoryes.create(req.body)

       if(!subCategory){
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
            data : subCategory,
            message : 'Data pass'
       })
       
    } catch (error) {
       return res.status(500)
       .json({
            success : false,
            data : [],
            message : 'server error' + error.message
       })
    }

}

const putSubCategory = (req,res) => {
    try {
        res.send('Put a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

const deleteSubCategory = (req,res) => {
    try {
        res.send('Delete a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getSubCategory,
    addSubCategory,
    putSubCategory,
    deleteSubCategory
}