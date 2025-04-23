import express from "express"
import isAuth from '../middlewares/isAuth.js'
import upload from "../middlewares/multer.js"

import { getCurrentUser, updateProfile } from "../controllers/user.controller.js"

let userRouter=express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateProfile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)



export default userRouter