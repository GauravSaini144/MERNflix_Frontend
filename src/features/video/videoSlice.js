import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    videos:[],
    error:null,
};

const videoSlice = createSlice({
    name:'Videos',
    initialState,
    reducers:{
        getVideosRequest:(state, action)=>{
            state.loading = true;
        },
        getVideosSuccess:(state, action)=>{
            state.loading = false;
            state.videos = action.payload;
        },
        getVideosFail:(state, action) =>{
            state.loading = false;
            state.error = action.payload;
        }
    }

});

export const {getVideosFail, getVideosRequest, getVideosSuccess} = videoSlice.actions;
export default videoSlice.reducer;