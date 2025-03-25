const express = require('express')
const { customer_controller } = require('../../../controller')

const customer = express.Router()

// localhost:8000/api/v1/customer/get-customer
customer.get(
    '/get-customer',
    customer_controller.getCustomer
)

// localhost:8000/api/v1/customer/get-one-customer/:id
customer.get(
    '/get-one-customer/:id',
    customer_controller.getOneCustomer
)

// localhost:8000/api/v1/customer/add-customer
customer.post(
    '/add-customer',
    customer_controller.addCustomer
)

// localhost:8000/api/v1/customer/put-customer/:id
customer.put(
    '/put-customer/:id',
    customer_controller.putCustomer
)

// localhost:8000/api/v1/customer/delete-customer/:id
customer.delete(
    '/delete-customer/:id',
    customer_controller.deleteCustomer
)

module.exports = customer