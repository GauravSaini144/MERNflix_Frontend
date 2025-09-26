import {configureStore} from "@reduxjs/toolkit"
import userReducers from "../features/user/userSlice.js"
import signupReducers from "../features/user/userSignupSlice.js"
import videosReducers from "../features/video/videoSlice.js"
const store = configureStore({
    reducer:{
      User:userReducers,
      Signup:signupReducers,
      Videos:videosReducers
    },
    devTools:false
});

export default store;