import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser =  asyncHandler(async (req,res)=>{
 //get user details from frontend
 const {fullName,email,username,password} = req.body
 console.log(req.body);
 
 console.log("email:",email);
 // check if any field is empty?
 if([email,password,username,fullName].some((field)=>field?.trim()==="")){
      throw new ApiError(400,"All fields are required!")

 }
 // check if user already exist?
 const existedUser = User.find({
     $or:[{username},{email}]
 })
 

 if(existedUser){
     throw new ApiError(409,"User with email or username already exist!")
 }
 // check for images, check for avatar
 const avatarLocalPath = req.files?.avatar[0]?.path // yeh files ka access req me multer ke wajah se aya hai... middleware req ko extra feature provide kiya hai jinme se ek file hai
 const coverImageLocalPath = req.files?.coverImage[0]?.path;
 console.log(req.files);
 if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required to localpath")
 }
 // upload them to cloudinary,avatar...
 const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)
 if(!avatar){
        throw new ApiError(400,"avatar file is required to cloudinary")

 }
 // create user object and create entry to db...
 const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url || "", // checked if coverimage is given or not...
    email,
    password,
    username: username.toLowerCase()
 })
 // check for user creation
 const createdUser = await User.findById(user._id).select("-password -refreshToken") // .select bata rha ki kya kya hame nhi chahiye... iss case me password and refreshToken
 if(!createdUser){
    throw new ApiError(500,"something went wrong while registering user")
}
//return response
return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)
})


export {registerUser}