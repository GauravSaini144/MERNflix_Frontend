import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    isSignedUp:false,
    error:null,
};

const signupSlice = createSlice({
    name:"Signup",
    initialState,
    reducers:{
        signupRequest:(state, action)=>{
          state.loading=true;
        },
        signupSuccess:(state, action)=>{
          state.loading=false;
          state.isSignedUp=action.payload.success;
        },
        signupFail:(state, action)=>{
             state.loading=false;
             state.error = action.payload;
        },
        clearSignupError:(state, action)=>{
          state.error = null;
        }
    },
    
})

export default signupSlice.reducer;
export const {signupFail, signupRequest, signupSuccess, clearSignupError} = signupSlice.actions;