const express = require('express')
const { subCategory_controller } = require('../../../controller')
const upload = require('../../../middleware/upload')

const subcategory = express.Router()

// localhost:4000/api/v1/subcategory/get-subcategory
subcategory.get(
    '/get-subcategory',
    subCategory_controller.getSubCategory
)

// localhost:4000/api/v1/subcategory/post-subcategory
subcategory.post(
    '/post-subcategory',
    upload.single('subCat_img'),
    subCategory_controller.addSubCategory
)

// localhost:4000/api/v1/subcategory/put-subcategory/:id
subcategory.put(
    '/put-subcategory/:id',
    subCategory_controller.putSubCategory
)

// localhost:4000/api/v1/subcategory/delete-subcategory/:id
subcategory.delete(
    '/delete-subcategory/:id',
    subCategory_controller.deleteSubCategory
)

module.exports = subcategory
