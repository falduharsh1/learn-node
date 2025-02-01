const express = require('express')
const { Category_controller } = require('../../../controller/index.js')
const upload = require('../../../middleware/upload.js')

const category = express.Router()

// localhost:4000/api/v1/category/get-category
category.get(
    '/get-category/:id',
    Category_controller.getCategory
)

// localhost:4000/api/v1/category/list-category
category.get(
    '/list-category',
    Category_controller.listCategory
)

// localhost:4000/api/v1/category/post-category
category.post(
    '/post-category',
    upload.single('cat_img'),
    Category_controller.addCategory
)

// localhost:4000/api/v1/category/put-category/:id
category.put(
    '/put-category/:id',
    upload.single('cat_img'),
    Category_controller.putCategory
)

// localhost:4000/api/v1/category/delete-category/:id
category.delete(
    '/delete-category/:id',
    Category_controller.deleteCategory
)

module.exports = category


