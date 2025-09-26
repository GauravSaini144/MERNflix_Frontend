import axios from "axios"
import {getVideosFail, getVideosRequest, getVideosSuccess} from "./videoSlice.js"


export const getFeedVideos = () =>async(dispatch)=>{

    try {
        const config = {withCredentials:true, headers:{'Content-Type':'application/json'}}
        dispatch(getVideosRequest());
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/videos/all`, config);
        dispatch(getVideosSuccess(data.data.videos));
        
    } catch (error) {
        console.log("videos api error",error);
        dispatch(getVideosFail(error.response.data.message));
    }
} 


export const getSearchVideo = (search) =>async(dispatch)=>{
    try {
        dispatch(getVideosRequest());
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/videos/videos?query=${search}`, {withCredentials:true});
      dispatch(getVideosSuccess(data.data));
        
        
    } catch (error) {
        console.log("Error in search", error);
        
    }
}