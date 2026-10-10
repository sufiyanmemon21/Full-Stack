import {createSlice} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const registerUser=createAsyncThunk
("auth/registerUser",
    async(userData,{rejectWithValue})=>{
        try{
            const response=await api.post("/auth/register",userData);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

);``

export const AllUsers=createAsyncThunk 
("auth/allUsers",
    async(_, {rejectWithValue})=>{
        try{
            const res=await api.get("/auth/allusers");
            return res.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
    
    
        
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:"",
        loading:false,
        error:""
    },
    reducers:{
        logout:(state)=>{
            state.user=null   
            state.loading=null
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })  
        .addCase (registerUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=null
        })
        .addCase(registerUser.rejected,(state,action)=>{
           state.loading=false
           state.error=action.payload   
    })
    //All Users//
    .addCase(AllUsers.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    .addCase(AllUsers.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload
        state.error=null
    })
    .addCase(AllUsers.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
}

})

export const {logout}=authSlice.actions
export default authSlice.reducer