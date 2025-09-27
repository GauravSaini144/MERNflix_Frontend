import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {useSelector} from "react-redux"
function DeleteVideo({setIsUpdated, setIsDelete, videoId, setIsEdit}) {

  const {user} = useSelector((state)=>state.User);
  const [loading, setLoading] = useState(false);
 const deleteVideo = async()=>{

  try {
    setLoading(true);
    const config = {withCredentials:true};

    const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/videos/delete-video/${videoId}`, {}, config);
    setLoading(false);
    toast.success("video deleted")
    setIsUpdated((prev)=>!prev);
    setIsEdit(false);
    setIsDelete(false);
    
  } catch (error) {

    console.log("video delete error", error);
    setLoading(false);
    
  }

 }
  return (
  <>  <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={()=>{setIsDelete(false); setIsEdit(false)}} 
      ></div>
    <div className='fixed z-[40] w-60 md:w-md lg:w-md h-30 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-4 py-2 flex flex-col items-center justify-center gap-4'> 
    
    <div className='self-center text-gray-200  text-xl '>Want to Delete Video?</div>
   { loading? <div className='border-2 border-red-600 border-b-gray-300 rounded-full h-6 w-6 animate-spin '></div> :  <div className='  flex gap-2 items-center justify-center'>
        
        <button className='px-4 py-1 bg-red-600 text-white rounded-md ' onClick={deleteVideo}>Delete</button>
        <button className='px-4 py-1 bg-gray-900 text white rounded-md' onClick={()=>setIsDelete(false)}>Cancel</button>

    </div>
}
    </div>
    </>
  )
}

export default DeleteVideo