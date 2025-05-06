const express = require('express')
const { Category_controller } = require('../../../controller/index.js')
const upload = require('../../../middleware/upload.js')
const auth = require('../../../middleware/auth.js')
const validate = require('../../../middleware/validate.js')
const { addCategory, updateCategory, deleteCategory } = require('../../../validation/category_validation.js')
const { Category_validation } = require('../../../validation/index.js')

const category = express.Router()

// localhost:8000/api/v1/category/get-category
category.get(
    '/get-category/:id',
    Category_controller.getCategory
)

// localhost:8000/api/v1/category/list-category
category.get(
    '/list-category',
    Category_controller.listCategory
)

// localhost:8000/api/v1/category/Count-category
category.get(
    '/Count-category',
    Category_controller.CountCategory
)

// localhost:8000/api/v1/category/post-category
category.post(
    '/post-category',
    auth(["admin","employee","user"]),
    (req,res,next) => {
        upload.single('cat_img')(req, res,function(err) {
            if(err){
                return res.status(400)
                    .json({
                        message :  err.message
                    })
            }
            next()
        })
    }
    ,
    validate(Category_validation.addCategory),
    Category_controller.addCategory
)

// localhost:8000/api/v1/category/put-category/:id
category.put(
    '/put-category/:id',
    auth(["admin","employee","user"]),
    upload.single('cat_img'),
    validate(Category_validation.updateCategory),
    Category_controller.putCategory
)

// localhost:8000/api/v1/category/delete-category/:id
category.delete(
    '/delete-category/:id',
    auth(["admin","employee","user"]),
    validate(Category_validation.deleteCategory),
    Category_controller.deleteCategory
)

// localhost:8000/api/v1/category/count-active
category.get(
    '/count-active',
    Category_controller.CountActive
)

// localhost:8000/api/v1/category/most-products
category.get(
    '/most-products',
    Category_controller.mostProducts
)

// localhost:8000/api/v1/category/average-products
category.get(
    '/average-products',
    Category_controller.averageProducts
)

// localhost:8000/api/v1/category/inactiveProducts 
category.get(
    '/inactiveProducts',
    Category_controller.inactive
)

// localhost:8000/api/v1/category/count-subcategories
category.get(
    '/count-subcategories',
    Category_controller.countSubcategories
)

// localhost:8000/api/v1/category/category-subcategory/:id
category.get(
    '/category-subcategory/:id',
    Category_controller.SubCat_by_CatID
)

module.exports = category


