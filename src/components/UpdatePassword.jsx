import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function UpdatePassword({setIsUpdatePassword}) {
    const [error, setError] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [seeOldPassword, setSeeOldPassword] = useState(false);
    const [seeNewPassword, setSeeNewPassword] = useState(false);

    const updateUserPassword = async()=>{

      try {
        setError("");
        if(oldPassword.trim()===""){
          setError("old password required");
          return;
        }
        if(newPassword.trim()===""){
          setError("new password required");
          return;
        }


        const config = {withCredentials:true, headers:{'Content-Type':'application/json'}};
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/update-password`, {oldPassword, newPassword}, config);
        setIsUpdatePassword(false);
            } catch (error) {

              console.log("error in update password see here->, ",error);
              setError(error.response?.data?.message);
        
      }
    }

  return (
<>
     <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={()=>setIsUpdatePassword(false)} // close when clicking outside
      ></div>

    <div className='fixed w-[90%] h-[90%] z-[40] md:w-[80%] md:h-[80%] lg:w-[70%] lg:h-[70%] self-center bg-gray-800 top-[15%]  flex flex-col justify-center items-center'>
              
       <div className='text-xl font-semibold text-gray-200 mb-6'>Update Password</div>
           <div className='flex flex-col gap-4 text-white w-[80%] md:w-[45%] lg:w-[40%]  '>
       <div className='flex flex-col gap-2'>
        <label htmlFor="oldpassword" className='text-gray-300 text-lg' >Old Password: </label>
        <div className='relative'>
        <input type={ seeOldPassword?'text': 'password'}  id="oldpassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}  placeholder='old password' className='w-full border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300  '/>
        <button className='  absolute right-2 top-2 text-gray-400 focus:text-gray-200' onClick={()=>setSeeOldPassword((prev)=>!prev)}>{seeOldPassword?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}</button>
        </div>
       </div>
       <div className='flex flex-col gap-2'>
        <label htmlFor="newpassword" className='text-gray-300 text-lg' >New Password: </label>
        <div className='relative'>
        <input type={ seeNewPassword?'text':'password'}  id="newpassword" placeholder='new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className=' w-full border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300 '/>
        <button className='  absolute right-2 top-2 text-gray-400 focus:text-gray-200' onClick={()=>setSeeNewPassword((prev)=>!prev)}>{seeNewPassword?<i className="fa-regular fa-eye"></i>:<i className="fa-regular fa-eye-slash"></i>}</button>

        </div>
       </div>
          
        <div className='text-white flex gap-2 mt-4  '>
        <button className='px-4 py-1 bg-gray-900 rounded-full text-lg hover:bg-gray-800 ' onClick={()=>setIsUpdatePassword(false)}>cancel</button>
        <button className='px-4 py-1 bg-gray-300 rounded-full text-lg text-black hover:bg-gray-200' onClick={updateUserPassword} >Update</button>
        </div>
        <div className='h-6 self-center mt-4 text-red-400'>{error}</div>

       </div>
       

    </div>
    </>
  )
}

export default UpdatePassword