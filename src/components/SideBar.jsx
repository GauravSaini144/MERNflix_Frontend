import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
function SideBar({setIsOpenSideBar}) {
  const location = useLocation();

 
  

  return (
    <div className='bg-black text-white h-screen fixed w-[60%] md:w-[20%] lg:w-[20%] px-2 border-1 border-gray-700'>

        <div className='flex flex-col gap-6 mt-4 text-lg '>
            <Link to={"/"} onClick={()=>setIsOpenSideBar(false)} ><p className={location.pathname==="/"? 'px-2 border-1 bg-gray-800 border-gray-500 cursor-pointer':'px-2 border-1 border-gray-500 cursor-pointer'}>Home</p></Link>
             <Link to={"/liked-video"} onClick={()=>setIsOpenSideBar(false)}><p className={location.pathname==="/liked-video"? 'px-2 border-1 bg-gray-800 border-gray-500 cursor-pointer':'px-2 border-1 border-gray-500 cursor-pointer'}>Liked Videos</p></Link>
             <Link to={"/subscription"} onClick={()=>setIsOpenSideBar(false)}><p className={location.pathname==="/subscription"? 'px-2 border-1 bg-gray-800 border-gray-500 cursor-pointer':'px-2 border-1 border-gray-500 cursor-pointer'}>Channels Subscribed</p></Link>
             <Link to={"/watch-later"} onClick={()=>setIsOpenSideBar(false)}><p className={location.pathname==="/watch-later"? 'px-2 border-1 bg-gray-800 border-gray-500 cursor-pointer':'px-2 border-1 border-gray-500 cursor-pointer'}>Watch Later</p></Link>
            
             <Link to={"/History"} onClick={()=>setIsOpenSideBar(false)}><p className={location.pathname==="/History"? 'px-2 border-1 bg-gray-800 border-gray-500 cursor-pointer':'px-2 border-1 border-gray-500 cursor-pointer'}>History</p></Link>


             
        </div>
     
    </div>
  )
}

export default SideBar