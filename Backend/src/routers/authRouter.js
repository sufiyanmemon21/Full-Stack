import express from "express";
import { AllUsers, Login, Register } from "../controllers/authController.js";

const authRouter=express.Router()

authRouter.post("/login",Login)
authRouter.post("/register",Register)
authRouter.get("/allusers",AllUsers


    
)

export default authRouter