const cloudinary = require("cloudinary").v2;

const cloudinaryUploadImg = async (imgPath,folderName) => {
    cloudinary.config({ 
        cloud_name: 'dudpsgpqx', 
        api_key: process.env.CLOUDINARY_API_Key, 
        api_secret: process.env.CLOUDINARY_API_Secret 
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
        imgPath, {
            public_id: folderName,
            folderName: folderName
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log("uploadResult",uploadResult);

    return uploadResult;
}

module.exports = cloudinaryUploadImg