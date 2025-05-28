// yaha express ki sarri cheezo ka logic hota hai
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({  // agr ham directly app.use(cors()) krte toh kisi bhee origin se yehreq acept kr leta but ham yaha origin bhee define kr rhe hai toh usi perticular origin se req accept krega...
    origin: process.env.CORS_ORIGIN, // hamne .env file me * rkha hai isko ki kisi bhee origin se allow krdo
    credentials: true
}))
 app.use(express.json({limit:"16kb"})) // hamne json file ko allow kr diya... but iski limit hamne 16kb rkhi hai... usse jyada me server crash ho skta hai
app.use(express.urlencoded({extended:true,limit:"16kb"})) // yeh tabke liye jab data url se aye... 
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users",userRouter) // jaise he /user type kiya , controle userRouter ko chala gaya
// pehla hum app.use ki jagah app.get ka use kr rhe the kyuki ham route usi ke ander defin kr rhe the... but ab hamne route agal file me define kr rkha hai 
// toh hum usko middleware ki tarah likhenge  
export {app}