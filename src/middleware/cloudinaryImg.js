const cloudinary = require("cloudinary").v2;



const cloudinaryUploadImg = async (imgPath,folderName) => {
    await cloudinary.config({ 
        cloud_name: 'dudpsgpqx', 
        api_key: process.env.CLOUDINARY_API_Key, 
        api_secret: process.env.CLOUDINARY_API_Secret 
    });
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
        imgPath, {
            folderName: folderName
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log("uploadResult",uploadResult);

    return uploadResult;
}

const deleteCloudinaryImg = async(public_id) => {
    try {
        await cloudinary.config({ 
            cloud_name: 'dudpsgpqx', 
            api_key: process.env.CLOUDINARY_API_Key, 
            api_secret: process.env.CLOUDINARY_API_Secret 
        });
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        throw new Error("Error in delete cloudinary image: " + error);
    }
}

module.exports = {
    cloudinaryUploadImg,
    deleteCloudinaryImg
}