import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function UpdateProfile({setOpenEditProfile, user, setIsUpdated}) {
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");
  const updateUserDetails = async()=>{
    try {

      if(fullname.trim()===""){
        setError("fullname required");
        return;
        
      }
      if(email.trim()===""){
        setError("email required")
        return;
      }

       setError("");
      const config = {withCredentials:true, headers:{'Content-Type':'application/json'}}
      
      const {data} = await axios.patch("/api/v1/users/update-user",{fullname, email}, config);

      setIsUpdated((prev)=>!prev);
      setOpenEditProfile(false);
    } catch (error) {
        
      setError(error.response?.data?.message);
      console.log("Error in updating user details, see here ", error);
      
    }
  }
  
  return (
<>
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={()=>setOpenEditProfile(false)} // close when clicking outside
      ></div>

    <div className=' fixed w-[90%] h-[90%] z-[40] md:w-[80%] md:h-[80%] lg:w-[70%] lg:h-[70%] bg-gray-800 self-center top-[15%]  z-30 flex flex-col justify-center items-center'>
      <div className='text-xl font-semibold text-gray-200 mb-6'>Update Profile Details</div>
        <div className='flex flex-col gap-4 text-white w-[80%] md:w-[45%] lg:w-[40%] '>
            <div className='flex flex-col gap-2'>
            <label htmlFor="fullname" className='text-gray-300 text-lg'>fullname: </label>
            <input type="text" id='fullname' placeholder='fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} className={ fullname.trim()===""?'border-1 border-red-500 px-2 py-2 outline-none ':'border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300 '}/>
            </div>
            <div className='flex flex-col  '>
              <label htmlFor="fullname" className='text-gray-300 text-lg'>email: </label>
            <input type="email" id="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} className={ email.trim()===""?'border-1 border-red-500 px-2 py-2 outline-none ':'border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300'} />
            </div>

             <div className='text-white flex gap-2 mt-4  '>
        <button className='px-4 py-1 bg-gray-900 rounded-full text-lg hover:bg-gray-800 ' onClick={()=>setOpenEditProfile(false)}>cancel</button>
        <button className='px-4 py-1 bg-gray-300 rounded-full text-lg text-black hover:bg-gray-200' onClick={updateUserDetails} >Update</button>
        </div>
        <div className='h-6 self-center mt-4 text-red-400'>{error}</div>
        </div>
       
    </div>
    </>
  )
}

export default UpdateProfile