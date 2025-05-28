import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //(file system) yeh nodejs me he inbuilt ata  hai... no need to install it(used to manage file system... read write remove)

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => { // yeh function ham bana rhe hai taki... file ko local storage se lekr cloudinary ki help se upload krde cloude storage me
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file is uploaded on cloudinary",response.url);
    return response;
    
  } catch (error) {
    fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload oparation got failed
    return null;
  }
};
 
export {uploadOnCloudinary} 
