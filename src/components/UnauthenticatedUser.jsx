import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function UnauthenticatedUser({location}) {
    const navigate = useNavigate();
    const goToLogin = ()=>{
        navigate("/login",{state:{from:location}, replace:true});
        }
        
  return (
  <div className='bg-black h-full min-h-screen w-full flex flex-col gap-4 items-center justify-center '>

    <p className='text-gray-200 text-2xl font-semibold'>Unauthenticated! Please Login </p>
    <button className='bg-gray-200 px-6 py-2 hover:bg-gray-300 text-lg ' onClick={goToLogin}>Login</button>

     

  </div>
  )
}

export default UnauthenticatedUser