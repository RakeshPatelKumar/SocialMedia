import express from "express"
import dotenv from "dotenv"
import { connect } from "mongoose"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

dotenv.config() 

let app =express()
app.use(express.json());

app.use(cookieParser())
app.use(cors({
   origin:"http://localhost:5173" ,
   credentials:true
}))
let port=process.env.PORT || 4000

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
    connectDB()
    console.log("Server is Started")
})

//http:llocalhost:8000/api/auth/signup