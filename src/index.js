const connectDB = require('./Db/mongoDB');
const router = require('./routes/api/v1');

require('dotenv').config()

const express = require('express')
const app = express();

app.use(express.json())

//   app.get('/product', (req, res) => {
//     res.send('Hello Worldd!')
//   })

//   app.post('/product', (req, res) => {
//     res.send('Got a POST request')
//   })

//   app.put('/product/:id', (req, res) => {
//     res.send('Got a PUT request at /user')
//   })

//   app.delete('/product/:id', (req, res) => {
//     res.send('Got a DELETE request at /user')
//   })

connectDB()

app.use('/api/v1', router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`)
})

console.log("hello node !", );


