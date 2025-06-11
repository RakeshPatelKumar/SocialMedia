import mongoose from "mongoose"
let connectionSchema=new mongoose.Schema({

    sender:{
        typr:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending4"
    }

},{timestamps:true})

const Connection=mongoose.model("Connection,connectioSchema")
export default Connection