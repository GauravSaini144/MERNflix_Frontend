import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { getFeedVideos } from '../features/video/videoApi';
import VideoCard from './VideoCard';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Loader from "./Loader"
function Home() {
  const {loading, user, isAuthenticated} = useSelector((state)=>state.User);
  const {loading:videoLoading,videos } = useSelector((state)=>state.Videos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(()=>{
   if(isAuthenticated===true){
    if(videos.length===0){
      dispatch(getFeedVideos());
   }
  } 
  },[dispatch, isAuthenticated]);
 

      

if(loading ){
  return <Loader/>
}

if(videoLoading){

  return <Loader/>
  
}






  
  return ( 
 <>  
 <div className='flex flex-col bg-black h-full min-h-screen  w-full px-2 md:px-6 lg:px-6 m pb-8   '>
      
       
        <div className='mt-8'>
          {
            videos.length>0 && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1  items-center justify-center md:justify-start lg:justify-start   w-full  '>
              {
                videos.map((video)=>{

                  return  <div key={video._id} className='w-full'> <VideoCard video={video}/></div>
                })
              }
            </div>
          }
        </div>

        

        <div className='flex items-center  justify-center'>
          {
            videos.length===0 &&
            <div className=' flex items-center justify-center  border-1 border-gray-600 rounded-md mt-12 h-50 w-[80%] md:w-[50%] lg:w-[40%]'>
              
              <p className='text-xl text-gray-300'>No video Found</p>

            </div>
          }
        </div>
    </div>
    
</> )
}


export default Home