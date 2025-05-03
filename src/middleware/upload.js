const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        console.log("files",file);

        const ext = path.extname(file.originalname).toLowerCase()

        if(!(ext === '.png' || ext === '.jpg')){
            return cb(new Error('Only png and jpg files are allowed'))
        }

        const filePath = path.join("public",file.fieldname)

      //   fs.mkdir(filePath , {recursive : true} , (err) => {
      //       if(err){
      //           console.log(err);    
      //       }
      //   })
        
      // cb(null, filePath)

      cb(null, "/tmp");
    },
    
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload