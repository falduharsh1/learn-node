const mysqlpool = require('./Db/mysqlDB');
const connectDB = require('./Db/mongoDB');
const router = require('./routes/api/v1');
const  cors = require('cors')
const cookieParser = require('cookie-parser')


require('dotenv').config()

const express = require('express');
const passport = require('passport');
const Googlestrategy = require('./utils/provider');
const connectChat = require('./utils/soketIO');
const app = express();

app.use(express.json())

app.use(cookieParser())

connectDB()
connectChat()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 ,
  credentials : true
}

app.use(cors(corsOptions))

app.use('/public', express.static('public'))
app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

Googlestrategy()

app.get("/",(req,res) => {
  res.status(200).json({
    message : 'Deployement successfull'
  })
})

app.use('/api/v1', router)

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port`)
// })

module.exports = app

console.log("hello node !", );


