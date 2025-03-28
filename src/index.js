const mysqlpool = require('./Db/mysqlDB');
const connectDB = require('./Db/mongoDB');
const router = require('./routes/api/v1');
const  cors = require('cors')
const cookieParser = require('cookie-parser')


require('dotenv').config()

const express = require('express')
const app = express();

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

connectDB()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 ,
  credentials : true
}

app.use('/public', express.static('public'))


app.use('/api/v1', router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`)
})

console.log("hello node !", );


