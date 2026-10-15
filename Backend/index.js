import express from "express";
import mongoose from "mongoose";
import Database from "./src/configs/dbconfig.js";
import "dotenv/config"
import authRouter from "./src/routers/authRouter.js";
import forgetRouter from "./src/routers/forgetRouter.js";
import cors from "cors";

const app=express();
const port=process.env.PORT
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)
app.use("/forget",forgetRouter)

Database()


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
