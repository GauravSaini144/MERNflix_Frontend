import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar';
import { getFeedVideos, getSearchVideo } from '../features/video/videoApi';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { loginUser, logoutUser } from '../features/user/userApi';


function Navbar() {
    const {loading, user, isAuthenticated} = useSelector((state)=>state.User);
     const [isOpenSideBar, setIsOpenSideBar] = useState(false);
     
     const [search, setSearch] = useState("");
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [open, setOpen] = useState(false);
       const [backButton, setBackButton] = useState(false);

     const searchVideo = async()=>{
        if(search.trim()===""){
            return;
        }

           dispatch(getSearchVideo(search));

                      setBackButton(true);
                      navigate("/");

     }



     const logout = async()=>{

     dispatch(logoutUser());

     
     }

      const back = ()=>{
        
        setBackButton(false);
  
        dispatch(getFeedVideos());
  
       }

  return (
    <div className='sticky top-0  bg-black   '>
        <div className='flex bg-black justify-between text-white px-2 py-4 md:px-4 md:py-4  lg:px-6 lg:py-6 gap-2 items-center-center '>
               

            <div className='flex gap-2 md:gap-4 lg:gap-4 items-center'>
              <button className='text-white cursor-pointer outline-none' onClick={()=>{setIsOpenSideBar((prev)=>!prev)}}>{isOpenSideBar? <i className="fa-solid fa-xmark fa-lg"></i>:<i className="fa-solid fa-bars fa-lg"></i>}</button>
              <div className=' text-cyan-300 outline-none cursor-pointer'>
                <Link to={"/"}>
              MERNflix
              </Link>
              </div>
            </div>
            <div className='flex'>
              <input type="text" placeholder='search' className='border-1 border-gray-200 p-1 px-2  md:p-2 md:px-4 lg:p-2 lg:px-4  cursor-pointer   w-[100%] md:w-[300px] lg:w-[350px] outline-none' value={search} onChange={(e)=>setSearch(e.target.value)} />
              <button className='border-1 bg-gray-100 text-black font-semibold border-gray-200  p-1 px-3  lg:p-2 lg:px-4 rounded-br-2xl rounded-tr-2xl cursor-pointer' onClick={searchVideo}><i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
            </div>
           


            <div className='flex gap-2 md:gap-6 lg:gap-12 items-center '>
              <Link to={"/create"} ><div className=' flex   rounded-full ' title='Upload video'>
                 {/* <span>create</span> */}
                 <i className="fa-solid fa-square-plus fa-2xl"></i>
              </div>
              </Link>
              <div className='h-10 w-10 rounded-full bg-green-500 relative ' >
                { user && <img onClick={()=>setOpen((prev)=>!prev)} className={open?"h-10 w-10 border-2 border-gray-400 rounded-full cursor-pointer ":"h-10 w-10  rounded-full cursor-pointer "} src={user.avatar} alt="" />
                  } 
                  {open && <div className='absolute flex flex-col  top-12 right-0 bg-gray-900 h-20 w-40  text-white items-center justify-evenly border-2 border-gray-500 '>
                                 <Link to={`/channel/${user?.username}`}><div onClick={()=>setOpen(false)} className='w-full text-center hover:text-gray-400 cursor-pointer '>
                                    Profile
                                   
                                  </div>
                                  </Link>
                                  <div className='w-full'>
                                  <hr />
                                  </div>



                                  <div onClick={logout} className='w-full text-center hover:text-red-700 cursor-pointer text-red-400 '>
                                    <span>Logout</span> &nbsp; 
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                  </div>
                    </div>}
              </div>
              
            </div>
        </div>
         <div className=''> 
       {isOpenSideBar&&<SideBar setIsOpenSideBar={setIsOpenSideBar} />}
          </div>
        
        

        {backButton && <div className='w-full text-white  pl-4 bg-black '>
          
          <button onClick={back} className=''><i className="fa-solid fa-arrow-left fa-lg"></i></button>
           
        </div>
}
      
       
          
    </div>
  )



}

export default Navbar