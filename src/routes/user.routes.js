import { Router } from "express";
import { registerUser } from "../controllers/user.controler.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/register").post(upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]),registerUser)
// hame image bhee send krni thi toh hamne upload.field(multer) middleware ki help li...
export default router