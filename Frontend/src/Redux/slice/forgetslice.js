import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const verifyEmail=createAsyncThunk
("/forget/verifyEmail",
    async(userData,{rejectWithValue})=>{
        try{
            const response=await api.post("/forget/verifyEmail",userData);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

);
export const verifyOtp=createAsyncThunk
("/forget/verifyOtp",
    async(userData,{rejectWithValue})=>{
        try{
            const response=await api.post("/forget/verifyOtp",userData);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

);
export const resetPassword=createAsyncThunk 
("/forget/resetPassword",
    async(userData,{rejectWithValue})=>{
        try{
            const response=await api.post("/forget/resetPassword",userData);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

);


const forgetSlice = createSlice({
    name:"forget",
    initialState:{
        email:"",
        otpVerified:false,
        emailVerfied:false,
    },

    //VERIFY EMAIL//
     extraReducers:(builder)=>{
        builder
                .addCase(verifyEmail.pending,(  state)=>{
                    state.loading=true
                    state.error=null
                })  
                .addCase (verifyEmail.fulfilled,(state,action)=>{
                    state.email=action.payload.email
                    state.emailVerfied=true
                    state.loading=false
                    state.error=null
                })
                .addCase(verifyEmail.rejected,(state,action)=>{
                   state.loading=false
                   state.error=action.payload   
            })

            //VERIFY OTP//
            .addCase(verifyOtp.pending, (state)=>{
                state.loading=true
                state.error=null
            })
            .addCase (verifyOtp.fulfilled,(state,action)=>{
                state.otpVerified=true
                state.loading=false
                state.error=null
            })
            .addCase(verifyOtp.rejected,(state,action)=>{
               state.loading=false
               state.error=action.payload   
        })
        //RESET PASSWORD//
        .addCase(resetPassword.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase (resetPassword.fulfilled,(state,action)=>{
            state.loading=false
            state.otpVerified=false
            state.emailVerfied=false
            state.error=null
        })
        .addCase(resetPassword.rejected,(state,action)=>{
              state.loading=false
              state.error=action.payload
        })

}})

export default forgetSlice.reducer
