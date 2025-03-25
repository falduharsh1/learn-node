const mysqlpool = require('../config/db');
const connectDB = require('./Db/mongoDB');
const router = require('./routes/api/v1');
const  cors = require('cors')

require('dotenv').config()

const express = require('express')
const app = express();

app.use(express.json())
app.use(cors(corsOptions))

connectDB()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use('/public', express.static('public'))


app.use('/api/v1', router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`)
})

console.log("hello node !", );


