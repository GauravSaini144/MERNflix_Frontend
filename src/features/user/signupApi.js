import {signupFail, signupRequest, signupSuccess, clearSignupError} from "./userSignupSlice.js"
import axios from "axios"


export const signup = (email, username, fullname, password, avatar, coverImage)=>async(dispatch)=>{
  try {
    dispatch(signupRequest());
     const config = {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}};
     const data = await axios.post("/api/v1/users/register", {email, username, fullname, password, avatar,coverImage}, config);
     dispatch(signupSuccess(data.data));
     
  } catch (error) {

    console.log("SIGNUP API ERROR ---- ", error.response);
    dispatch(signupFail(error.response.data.message));
    
  }
}

export const clearSignupAllError = () =>async(dispatch)=>{
    dispatch(clearSignupError());
}