import { configureStore } from "@reduxjs/toolkit";
import  CounterReducer  from "./slice/counterslice";
import authReducer from "./slice/authSlice";

export const store =configureStore({    
    reducer:{
        counter:CounterReducer,
        auth:authReducer
    }
})      