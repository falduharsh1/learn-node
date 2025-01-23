require('dotenv').config()

const express = require('express')
const app = express()

app.get('/product', (req, res) => {
    res.send('Hello Worldd!')
  })

  app.post('/product', (req, res) => {
    res.send('Got a POST request')
  })

  app.put('/product:id', (req, res) => {
    res.send('Got a PUT request at /user')
  })

  app.delete('/product:id', (req, res) => {
    res.send('Got a DELETE request at /user')
  })

  app.listen(8000, () => {
    console.log(`Example app listening on port`)
  })
  

console.log()

console.log("hello node !",process.env.PORT);


