const express = require('express')

const category = express.Router()

// localhost:4000/api/v1/category/get-category
category.get(
    '/get-category',
    (req,res) => {
        res.send('Get a Category')
    }
)

// localhost:4000/api/v1/category/post-category
category.post(
    '/post-category',
    (req,res) => {
        res.send('Post a Category')
    }
)

// localhost:4000/api/v1/category/put-category/:id
category.put(
    '/put-category/:id',
    (req,res) => {
        res.send('Put a Category')
    }
)

// localhost:4000/api/v1/category/delete-category/:id
category.delete(
    '/delete-category/:id',
    (req,res) => {
        res.send('delete a Category')
    }
)

module.exports = category


