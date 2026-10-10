import mongoose from "mongoose"

const forgetschema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please enter a valid email"]
    },
    otp:{
        type:Number,
        required:true,
        max:9999
    }
},{timestamps:true})


export default mongoose.model("Forget",forgetschema)