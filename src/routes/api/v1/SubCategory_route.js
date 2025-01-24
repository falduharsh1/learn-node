const express = require('express')

const subcategory = express.Router()

// localhost:4000/api/v1/subcategory/get-subcategory
subcategory.get(
    '/get-subcategory',
    (req,res) => {
        res.send('Get a subcategory')
    }
)

// localhost:4000/api/v1/subcategory/post-subcategory
subcategory.post(
    '/post-subcategory',
    (req,res) => {
        res.send('Post a subcategory')
    }
)

// localhost:4000/api/v1/subcategory/put-subcategory/:id
subcategory.put(
    '/put-subcategory/:id',
    (req,res) => {
        res.send('Put a subcategory')
    }
)

// localhost:4000/api/v1/subcategory/delete-subcategory/:id
subcategory.delete(
    '/delete-subcategory/:id',
    (req,res) => {
        res.send('delete a subcategory')
    }
)

module.exports = subcategory
