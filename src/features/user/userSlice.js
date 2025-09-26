import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
 loading:false,
 user:null,
 isAuthenticated:false,
 error:null,
 
}

const userSlice  = createSlice({
    name:"User",
    initialState,
    reducers:{
        loginRequest:(state, action)=>{

            state.loading = true;
            
        },
        loginSuccess:(state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated=true;
        },
        loginFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        clearUserError:(state, action)=>{
            state.error=null;
        },
        logoutUserRequest:(state, action)=>{
            state.loading = true;

        },
        logoutUserSuccess:(state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutUserFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        getCurrentUserRequest:(state, action)=>{
            state.loading = true;
        },
        getCurrentUserSuccess:(state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;

        },
        getCurrentUserFail:(state, action)=>{
            state.loading = false;
        },

        refreshTokenRequest:(state, action)=>{
            state.loading=true;
        },
        refreshTokenSuccess:(state, action)=>{
            state.loading=false;
            if(state.user){
                state.user.accessToken = action.payload.accessToken;
            }
            state.isAuthenticated = true;
        },
        refreshTokenFail:(state, action)=>{
            state.loading=false;
            state.error = action.payload;
            state.isAuthenticated=false;
            state.user=null;
        },


        updateUserDetailsRequest:(state, action)=>{
            state.loading = true;
            
        },
        updateUserDetailsSuccess:(state, action)=>{
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated=true;

        },

        updateUserDetailsFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
         
        updatePasswordRequest:(state, action)=>{
          state.loading = true;
        },
        updatePasswordSuccess:(state, action)=>{
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
        },
        updatePasswordFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        updateAvatarRequest:(state, action)=>{
             state.loading = true;
        
        },
        updateAvatarSuccess:(state, action)=>{
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
        },
        updateAvatarFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        updateCoverImageRequest:(state, action)=>{
             state.loading = true;
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
        },
        updateCoverImageSuccess:(state, action)=>{
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
        },
        updateCoverImageFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        
 }
})
export const {loginRequest,
    loginSuccess,
    loginFail,
    clearUserError, 
    logoutUserFail,
    logoutUserRequest,
    logoutUserSuccess,
    getCurrentUserFail,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    refreshTokenFail, 
    refreshTokenRequest,
    refreshTokenSuccess,
    updateAvatarFail,
    updateAvatarRequest,
    updateAvatarSuccess,
    updateCoverImageFail,
    updateCoverImageRequest,
    updateCoverImageSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updateUserDetailsFail,
    updateUserDetailsRequest,
    updateUserDetailsSuccess

        } =userSlice.actions;
export default userSlice.reducer;
