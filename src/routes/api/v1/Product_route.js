const express = require('express')
const router = express.Router();

// localhost:4000/api/v1/product/get-product
router.get('/get-product', (req, res) => {
    res.send('Hello Worldd!')
})

// localhost:4000/api/v1/product/post-product
router.post('/post-product', (req, res) => {
    res.send('Got a POST request')
})

// localhost:4000/api/v1/product/put-product/:id
router.put('/put-product/:id', (req, res) => {
    res.send('Got a PUT request')
})

// localhost:4000/api/v1/product/delete-product/:id
router.delete('/delete-product/:id', (req, res) => {
    res.send('Got a DELETE request ')
})


module.exports = router
