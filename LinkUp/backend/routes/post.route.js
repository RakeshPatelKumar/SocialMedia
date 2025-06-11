import express from "express";
import { comment, createPost, getPost, like } from "../controllers/post.controller.js";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

const postRouter = express.Router();

postRouter.post("/create", isAuth, upload.single("image"), createPost);
postRouter.get("/getPost",isAuth,getPost)
postRouter.get("/like/:id",isAuth,like)
postRouter.post("/comment/:id",isAuth,comment)



export default postRouter;