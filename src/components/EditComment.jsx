import React, { useState } from 'react'
import axios from 'axios';
function EditComment({commentData, setIsEdit}) {
    const [comment, setComment] = useState(commentData.comment);
    const [loading, setLoading] = useState(false);
    const editComment = async() => {
         if(comment.trim()===""){
          return;
         }

         try {
          
          setLoading(true);
          const config = {withCredentials:true, headers:{'Content-Type':'application/json'}}
          
          const {data} = await axios.patch(`/api/v1/comment/c/${commentData.video}/comment/${commentData._id}`, {updatedComment:comment}, config);
          if(data){
            setIsEdit(false);
            setLoading(false);
          }
         } catch (error) {
          console.log(error);
          setLoading(false);
         }
        
         
    }
  return (
    <div className='flex gap-2 w-full items-end'>
        <img src={commentData.owner.avatar} alt="" className='h-10 w-13 rounded-full' />

      <div className='w-full'>
        <p className='text-gray-400 text-sm'>@{commentData.owner.username}</p>
        <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} className='w-full text-white outline-none text-lg px-2  border-b-1 border-gray-300'/>
      </div>
      <button className='px-2 py-1 h-fit bg-gray-300 text-black rounded-lg text-sm ' onClick={editComment}>{loading?<div className='flex self-center  h-5 w-5 border-2 border-red-600 border-b-gray-600 rounded-full animate-spin '></div>:"Done"}</button>
      <button className='px-2 py-1 h-fit bg-gray-500 text-black rounded-lg text-sm' onClick={()=>setIsEdit(false)}>Cancel</button>
    </div>
  )
}

export default EditComment