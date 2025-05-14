//require('dotenv').config({path:'./env'})  // this is inconsistent so we will use import method
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({path:"./env"}) // dotenv ko env file ka path diya

connectDB(); // kyuki yeh ek function hai
/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    // maanlo mongoDB connect ho gaya but express baat nhi kr paa rha toh uske liye do follow
    app.on("error", (error) => {
      console.log("ERRR:", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Appis listening on the port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
    throw error;
  }
})();
*/
