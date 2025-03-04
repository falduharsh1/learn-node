const express = require('express')
const { subCategory_controller } = require('../../../controller')
const upload = require('../../../middleware/upload')

const subcategory = express.Router()

// localhost:8000/api/v1/subcategory/get-subcategory
subcategory.get(
    '/get-subcategory/:id',
    subCategory_controller.getSubCategory
)

// localhost:8000/api/v1/subcategory/list-subcategory
subcategory.get(
    '/list-subcategory',
    subCategory_controller.listSubCategory
)

// localhost:8000/api/v1/subcategory/get_data-subcategory
subcategory.get(
    '/get_data-subcategory',
    subCategory_controller.get_data_SubCategory
)

// localhost:8000/api/v1/subcategory/post-subcategory
subcategory.post(
    '/post-subcategory',
    upload.single('subCat_img'),
    subCategory_controller.addSubCategory
)

// localhost:8000/api/v1/subcategory/put-subcategory/:id
subcategory.put(
    '/put-subcategory/:id',
    upload.single('subCat_img'),
    subCategory_controller.putSubCategory
)

// localhost:8000/api/v1/subcategory/delete-subcategory/:id
subcategory.delete(
    '/delete-subcategory/:id',
    subCategory_controller.deleteSubCategory
)

// localhost:8000/api/v1/subcategory/activeSubCategory
// subcategory.get(
//     '/activeSubCategory',
//     subCategory_controller.activeSubCategory
// )

// localhost:8000/api/v1/subcategory/activeSubCategory
subcategory.get(
    '/activeSubCategory',
    subCategory_controller.activeSubCategory
)

// localhost:8000/api/v1/subcategory/mostSubCategory
subcategory.get(
    '/mostSubCategory',
    subCategory_controller.mostSubCategory
)

// localhost:8000/api/v1/subcategory/InactiveSubCategory
subcategory.get(
    '/InactiveSubCategory',
    subCategory_controller.InactiveSubCategory
)

// localhost:8000/api/v1/subcategory/countProducts
subcategory.get(
    '/countProducts',
    subCategory_controller.countProducts
)

module.exports = subcategory
