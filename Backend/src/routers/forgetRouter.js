import express from "express";
import { resetPassword, verifyEmail, verifyOtp } from "../controllers/forgetController.js";

const forgetRouter=express.Router();

forgetRouter.post("/verifyEmail",verifyEmail)
forgetRouter.post("/verifyOtp",verifyOtp)
forgetRouter.post("/resetPassword",resetPassword)

export default forgetRouter;