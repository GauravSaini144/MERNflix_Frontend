import axios from 'axios';

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function Like({videoId}) {
 
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState("");
  useEffect(()=>{
    const getLikes=async()=>{
      try {
        
        
        const config = {withCredentials:true};
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/like/like/${videoId}`, config);
        setIsLiked(data.data.isLikedByMe);
        setLikes(data.data.totalLikes);
      } catch (error) {

        console.log("like error", error);
        
      }
    }

    getLikes();
  },[videoId]);
  
  const likeVideo = async()=>{
    try{
      if(isLiked===true){
        setIsLiked(false);
        if(likes>0){
          setLikes((pre)=>pre-1);
        }
        
        
      }
      else if(isLiked===false){
        setIsLiked(true)
        setLikes((pre)=>pre+1);
      
      }
     const config = {withCredentials:true, headers:{'Content-Type':'application/json'}};

      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/like/like/${videoId}`,{},config);
      
      
    }
    catch(error){
      console.log(error);
    }
  }
  
  return (
    
    <div className=' ml-2 md:ml-12 lg:ml-12 px-2 md:px-5 lg:px-5 bg-gray-800 py-2 rounded-full flex gap-2 text-gray-200'>
      <p className='text-gray-200 ' onClick={likeVideo}>{isLiked?<i className="fa-solid fa-thumbs-up fa-lg" ></i>:<i className="fa-regular fa-thumbs-up fa-lg"></i>}</p> <p className='text-white'>{likes}</p>
</div>
  )
}

export default Like