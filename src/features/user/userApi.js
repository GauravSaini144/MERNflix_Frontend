import { loginFail, loginRequest, loginSuccess, clearUserError, logoutUserFail, logoutUserSuccess, logoutUserRequest, getCurrentUserFail, getCurrentUserRequest, getCurrentUserSuccess, refreshTokenRequest, refreshTokenSuccess, refreshTokenFail, updateUserDetailsRequest, updateUserDetailsSuccess, updateUserDetailsFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, updateAvatarRequest, updateAvatarSuccess, updateAvatarFail, updateCoverImageRequest, updateCoverImageSuccess, updateCoverImageFail } from "./userSlice";

import axios from "axios"
import api from "../axiosInspector.js";


export const loginUser = (identifier, password)=>async(dispatch)=>{
    try {
         dispatch(loginRequest());
         const config={withCredentials:true, headers:{'Content-Type':'application/json'}}

         const {data} = await axios.post('/api/v1/users/login',{identifier ,password}, config);
           
         dispatch(loginSuccess(data.data.user));

    } catch (error) {
        console.log("ERROR IN LOGIN USERAPI.JS FILE----", error);
        dispatch(loginFail(error.response.data.message));
    }
}

export const logoutUser = ()=>async(dispatch)=>{
    try {
         dispatch(logoutUserRequest());
         const config={withCredentials:true, headers:{'Content-Type':'application/json'}}

        const {data} = await axios.post("/api/v1/users/logout", config);
         dispatch(logoutUserSuccess());
    } catch (error) {
        console.log(error);
        dispatch(logoutUserFail(error.response.data.message));
    }
}

export const getCurrentUser = () => async(dispatch)=>{
    try {
        dispatch(getCurrentUserRequest());
        const config={withCredentials:true, headers:{'Content-Type':'application/json'}}
        const {data} = await axios.get("/api/v1/users/get-user",config);
        
        dispatch(getCurrentUserSuccess(data.data.user));
        

    } catch (error) {
        console.log(error);
        dispatch(getCurrentUserFail(error.response?.data?.message));
    }
}

export const clearUserAllErrors = ()=>async(dispatch)=>{
    dispatch(clearUserError());
}



export const refreshToken = ()=>async(dispatch)=>{
    try {
        dispatch(refreshTokenRequest());
        const config = {withCredentials:true, headers:{'Content-Type':'application/json'}};

        const {data} = await axios.post("/api/v1/users/refresh-token",{}, config);
        dispatch(refreshTokenSuccess(data));
        
    } catch (error) {
        console.log("error in refresh token api");
        dispatch(refreshTokenFail(error.response.data.message));
    };


}
