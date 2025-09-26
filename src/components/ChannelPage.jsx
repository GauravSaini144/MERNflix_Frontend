import React, { useDebugValue, useEffect, useState } from 'react'
import Loader from "./Loader"
import {useSelector} from "react-redux"
import UnauthenticatedUser from "./UnauthenticatedUser"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChannelVideoCard from './ChannelVideoCard';
import { useRef } from 'react';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import Navbar from './Navbar';
function ChannelPage() {
    const {username} = useParams();
    const [dataLoading, setDataLoading] = useState(false);
    const {loading, isAuthenticated, user} = useSelector((state)=>state.User);
    const [channelData, setChannelData] = useState(null);
    const [error, setError] = useState("");
    const [openEditCoverImage, setOpenEditCoverImage] = useState(false);
    const [openEditAvatar, setOpenEditAvatar] = useState(false);
    const [coverImage, setCoverImage] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
     const [isSubscribe, setIsSubscribe] = useState(null);
     const [openEditProfile, setOpenEditProfile] = useState(false);
     const [isUpdatePassword, setIsUpdatePassword] = useState(false);
 

      const updateCoverImage = async()=>{
          if(coverImage===""){
            return;
          }
          
              try {
                setUpdateLoading(true);
                const config = {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}};
  
            const {data} = await axios.patch("/api/v1/users/update-coverimage", {coverImage}, config);  
            
            if(data.data){
              setCoverImage("");
              setOpenEditCoverImage(false);
              setIsUpdated((prev)=>!prev);
              setUpdateLoading(false);
            }
              } catch (error) {
                console.log("coverimage error", error);
                setUpdateLoading(false);
              }     
        }
   
        const updateAvatar = async()=>{
          if(avatar===""){
            return;
          }
          
              try {
                setUpdateLoading(true);
                const config = {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}};
  
            const {data} = await axios.patch("/api/v1/users/update-avatar", {avatar}, config);  
            
            if(data.data){
              setAvatar("");
              setOpenEditAvatar(false);
              setIsUpdated((prev)=>!prev);
              setUpdateLoading(false);
            }
              } catch (error) {
                console.log("avatar error", error);
                setUpdateLoading(false);
              }     
        }
   

    useEffect(()=>{
      const getUserChannel = async()=>{
       try {
         setDataLoading(true);
         setError("");
        const encodedName = encodeURIComponent(username);
        const {data} = await axios.get(`/api/v1/users/c/${encodedName}`);
        setChannelData(data.data);
         setIsSubscribe(data.data?.isSubscribed);
        setDataLoading(false);
       } catch (error) {
        setDataLoading(false);
        setError(error.response?.data?.message);
       }
      };
      getUserChannel();

    },[username,isUpdated]);

      

    
     const subscribe=async(channelId)=>{
          
          try {
     
            if(isSubscribe===false){
              setIsSubscribe(true);
             }
             else if(isSubscribe===true){
              setIsSubscribe(false);
             }
            const {data} = await axios.post(`/api/v1/subscription/subscribe/${channelData._id}`);
            
          } catch (error) {
            
            console.log("Error in subscribe ",error);
          }
        }

       

    if(loading || dataLoading){
        return <Loader/>
    }
    if(isAuthenticated){
           
       return (<> <title>{channelData && channelData?.username}</title> {
       channelData && <div className='flex flex-col bg-black items-center h-full min-h-screen w-full text-white px-2 md:px-4 lg:px-8 py-1 relative'>
            {
              openEditProfile && <UpdateProfile setIsUpdated={setIsUpdated} setOpenEditProfile={setOpenEditProfile} user={channelData} />
            }
             {
              isUpdatePassword && <UpdatePassword setIsUpdatePassword={setIsUpdatePassword}/>
            }
            <div
            className='  w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-full  '
            >

                <div className="relative w-full h-24 sm:h-24 md:h-30 lg:h-40 overflow-hidden rounded-3xl border-1 border-gray-800">

                    <img src={channelData.coverImage} alt="banner image" className='w-full h-full object-cover ' />
                    { channelData._id === user._id && <button onClick={()=>setOpenEditCoverImage(true)} className='absolute bg-gray-900 text-white rounded-full top-1 right-1 p-2'> <i className="fa-solid fa-pen-to-square fa-lg"></i></button>
                    }
                    {
                      openEditCoverImage && <div className=' absolute w-[100%] h-[100%] bg-gray-900 text-white px-4 py-2 top-0 flex flex-col items-center justify-center gap-4'>
                        
                        <div className='flex flex-col gap-4 '>
                        <div className='border-1 border-gray-500 px-1'>
                        
                        <input type="file" onChange={(e)=>setCoverImage(e.target.files[0])}  />
                        </div>
                       <div className={updateLoading?'flex self-center':'flex gap-2 self-end'}>
     
                          {updateLoading? <div className=' h-6 w-6 border-4 border-gray-400 border-t-red-500 rounded-full animate-spin'></div>: <><button className='bg-gray-800 px-3 py-1 rounded-xl text-white' onClick={()=>setOpenEditCoverImage(false)}>cancel</button>
                        <button className='bg-gray-200 px-3 py-1 rounded-xl text-black' onClick={updateCoverImage}>Done</button>
                          </>}
                       </div>
                       </div>

                      </div>
                    }
                </div>  


                <div className=' flex gap-4 items-start w-full  mt-4'>
                     <div className='relative w-16 h-15 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-38 lg:h-38 rounded-full  '>
                     <img src={channelData.avatar} alt="avatar" className='w-full h-full object-fit rounded-full' />
                        { channelData._id === user._id && <button  onClick={()=>setOpenEditAvatar(true)} className='absolute bg-gray-600 text-white rounded-full bottom-1 right-1 p-1'> <i className="fa-solid fa-pen-to-square "></i></button>
                    }
                          
                          
                     {/* edit avatar  */}

                     {openEditAvatar && <div className='   text-white w-60 h-40 md:w-80 md:h-40 lg:w-80 lg:h-40 bg-gray-800 absolute z-30 px-4 top-6 left-4 sm:top-10 sm:left-4 md:top-16  md:left-16 lg:top-20 lg:left-20 flex flex-col gap-4 rounded-xl items-center justify-center '>
                               
                                 <div className='border-1 border-gray-500 w-full' >
                                  <input type="file" onChange={(e)=>setAvatar(e.target.files[0])} className='w-full' />

                                 </div>
                                 <div className={updateLoading?'self-center':'self-end flex gap-2'}>
                                  {updateLoading? <div className='h-6 w-6  border-4 border-gray-400 border-t-red-500 rounded-full animate-spin'></div>:<><button className='bg-gray-900 px-3 py-1 rounded-xl text-white' onClick={()=>setOpenEditAvatar(false)}>cancel</button>
                                  <button className='bg-gray-200 px-3 py-1 rounded-xl text-black' onClick={updateAvatar} >Done</button>
                                  </>}
                                 </div>
                      </div>}
                           
                     </div>



                     <div className='text-white flex flex-col gap-1 md:gap-2 lg:gap-3'>
                        <div className=' text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold text-gray-200'>{channelData.username}</div>
                        <div className='flex gap-0 sm:gap-1 md:gap-2 lg:gap-2 flex-wrap'>
                            <div>@{channelData.fullname}</div>
                            <div className='flex gap-2'>
                            <div className='text-gray-400'>{channelData.subscribersCount} subscribers</div>
                             <div className='text-gray-400'>{channelData.videos.length>0?`${channelData.videos.length} videos`:'No videos'}</div>
                             </div>
                        </div>
                      { channelData._id !== user._id ?
                        <div> {isSubscribe?<button onClick={subscribe} className='bg-gray-700 text-gray-100 px-4 py-2 rounded-full hover:bg-gray-600'>UnSubscribe</button>: <button onClick={subscribe} className='bg-gray-100 text-black px-4 py-2 hover:bg-gray-300 rounded-full'>Subscribe</button>}</div>
                        :
                        <div> <button className='  px-2 py-1 md:px-4 md:py-1 lg:px-4 lg:py-1 bg-gray-300 rounded-md text-black text-sm sm:text-md md:text-md lg:text-md ' onClick={()=>setOpenEditProfile(true)}>Edit Profile</button> <button className='  px-2 py-1 md:px-4 md:py-1 lg:px-4 lg:py-1 bg-gray-300 rounded-md text-black text-sm sm:text-md md:text-md lg:text-md' onClick={()=>setIsUpdatePassword(true)}>Update Password</button></div>
                      } 
                     </div>
                     
                </div>
                
                 {/* videos */}

            <div className='w-full mt-4'>
              <div className='text-white flex flex-col gap-2'>
                videos
                <hr />
              </div>

              <div className='w-full mt-4'>
                { 
                  channelData.videos && channelData.videos.length>0? 
                  <div className='grid gap-1 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>{
                    channelData.videos.map((video)=><ChannelVideoCard key={video._id} setIsUpdated={setIsUpdated} video={video} />)
                    } </div>:
                     <div>no videos</div>
                }
              </div>
            </div>
            </div>
          
            </div>}
    </>)
    }
    return <UnauthenticatedUser/>
}

export default ChannelPage