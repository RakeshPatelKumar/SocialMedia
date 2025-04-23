import express from "express";
import { createPost, getPost } from "../controllers/post.controller.js";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

const postRouter = express.Router();

postRouter.post("/create", isAuth, upload.single("image"), createPost);
postRouter.get("/getPost",isAuth,getPost)

export default postRouter;