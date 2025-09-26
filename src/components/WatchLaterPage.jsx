import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import { useNavigate, Navigate, useLocation} from 'react-router-dom'
import UnauthenticatedUser from './UnauthenticatedUser'
import axios from 'axios'
import VideoCard from './VideoCard'

function WatchLaterPage() {
    const {loading, user, isAuthenticated} = useSelector((state)=>state.User)
    const navigate = useNavigate(); 
    const location = useLocation();
    const [videos, setVideos] = useState([]);
    const [videoLoading, setVideoLoading] = useState(false);
    const [error, setError] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    
    useEffect(()=>{
       const getWatchLaterVideos =async()=>{
        try {
          setVideoLoading(true);
           const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/watch-later/get-watch-later-video`);
           
           console.log("Watch later videos", data.data);
           setVideos(data.data);
           setVideoLoading(false);
           setError(error.response?.data?.message);
           
        } catch (error) {
          console.log("Watch later video fetching error", error);
          setVideoLoading(false);
        }
       }
       getWatchLaterVideos();
    },[isChanged]);

 
    
    if(loading|| videoLoading){
        return <Loader/>
    }


    

  if(isAuthenticated){
    return<> <title>Watch Later</title>
    <div className=' flex flex-col h-full min-h-screen w-full bg-black text-white px-2 md:px-4 lg:px-6 pb-8'>
      <div className=' px-2 md:px-8 lg:px-8 mb-4'>
      <h1 className='text-2xl  font-semibold '>Watch Later Videos</h1>

      </div>
      {
         videos && videos.length>0 ?  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1 items-center justify-center md:justify-start lg:justify-start   w-full '>
          {
            videos.map((video)=>{
              return  <div className='w-full' key={video._id}> <VideoCard video={video} setIsChanged={setIsChanged}/></div>

            })
          }
         </div>: <div className='h-full w-full flex items-center justify-center mt-20'>
          <div className='text-2xl text-gray-400'>

                 Your Watch Later list is empty
               
          </div>
         </div>
      }
    </div>
    </>
  }

  return <UnauthenticatedUser location={location} />
  
}

export default WatchLaterPage
