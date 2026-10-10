import User from "../models/authModel.js"
import otpGenerator from "otp-generator"
import Forget from "../models/forgetModel.js"
import bcrypt from "bcrypt"


const  verifyEmail = async (req, res) => {
    try{
        const {email}=req.body
        if(!email){
            return res.status(404).json({msg:"please fill all the fields"}) 
    }

    const existingUser= await User.findOne({email})
    if(existingUser){ 
        const otp = await otpGenerator.generate(4,
    {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

     const existingotp= await Forget.findOne({email})
     if(existingotp){
        const updateOtp= await Forget.findByIdAndUpdate(existingotp._id, {otp}, {new: true})
        return res.status(200).json({msg:"email already exist",updateOtp})

     }else{
        const data= await Forget.create({email,otp})
        return res.status(200).json({msg:"otp sent successfully",data})
     }

    }else{
        return res.status(404).json({msg:"email not exist"})
    }

}catch(e){
    return res.status(400).json({error:e}) 
} 
}

const verifyOtp = async (req, res) => {
    try{
        const {email,otp}=req.body
        if(!email || !otp){
            return res.status(404).json({error:"please fill all the fields"}) 
    }   
    const check=await Forget.findOne({email,otp})
    if(check){
        return res.status(200).json({msg:"otp verified successfully"})
    }else{
        return res.status(404).json({msg:"invalid otp"})
    }
}catch(error){
    return res.status(400).json({error:"something went wrong"}) 
}
}

const resetPassword = async (req, res) => {
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).json({error:"please fill all the fields"}) 
 
        }
        
        const exist=await User.findOne({email})
        if (!exist){
            return res.status(404).json({error:"email not exist"})
        }
        const hashedpassword= await bcrypt.hash(password,10)
        const updateUser= await User.findByIdAndUpdate(exist._id,{$set:{password:hashedpassword}},{new:true}) 
        if(updateUser){
            return res.status(200).json({msg:"password reset",updateUser})
        }else{
            return res.status(400).json({error:"something went wrong"})
        }

}catch(error){
    return res.status(500).json({error:error.body}) 
}
}

export {verifyEmail ,verifyOtp,resetPassword} 