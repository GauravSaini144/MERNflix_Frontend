import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function WatchLater({videoId, setIsChanged}) {

    const location = useLocation();

    const handleWatchLater = async(e)=>{
          e.stopPropagation(); 
    e.preventDefault(); 
    
    try {
        const config = {withCredentials:true, headers:{'Content-Type':'application/json'}};

        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/watch-later/toggle-watch-later-video/${videoId}`,{}, config);

        toast.success(data?.message);

        if(location.pathname==="/watch-later"){
            setIsChanged((prev)=>!prev);
        }


    } catch (error) {
        
        console.log(" watch later error ",error);
    }

        }
  return (
    <div  className=' bg-gray-800 hover:bg-gray-700   text-white rounded-md  p-1 ' title='watch later'> <button onClick={(e)=>handleWatchLater(e)} className='cursor-pointer' title='watch later'><i className="fa-solid fa-clock fa-xl"></i></button></div>
  )
}

export default WatchLater