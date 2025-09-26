import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState} from 'react';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import VideoLoader from './VideoLoader';
import { getFeedVideos } from '../features/video/videoApi';
import SmallVideoCard from "./SmallVideoCard"
import EditComment from './EditComment';
import Like from './Like';
function VideoPlayer() {
   const navigate = useNavigate();
    const {videoId} = useParams();
    const [video, setVideo] = useState(null);
      const {videos } = useSelector((state)=>state.Videos);
    const {isAuthenticated, user} = useSelector((state)=>state.User);
    const [error, setError] = useState("");
    const [isSubscribe, setIsSubscribe] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [commentID, setCommentID] = useState("");
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [commentArray, setCommentsArray] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentDelete, setCommentDelete] = useState(false);
    useEffect(()=>{
      if(error){
        toast.error(error);
      }
      setError("");
      
    },[error]);
 

    
    useEffect(()=>{
        if(!videoId){
            navigate("/");
        }
        const getVideo = async()=>{
              
        
        
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/videos/video/${videoId}`,{withCredentials:true});
            
            setVideo(data.data[0]);
            
            if(data.data[0].isSubscribed){
              setIsSubscribe(true);
            }
            else if(data.data[0].isSubscribed===false){
            setIsSubscribe(false)
            } 

        } catch (error) {
            console.log("Error fetching video ", error);
            setError(error.response.data.message);
            setVideo(undefined);
        }
        }
        dispatch(getFeedVideos());
        getVideo();
    },[videoId, dispatch]);

    
    useEffect(()=>{
       const addViewAndHistory = async()=>{
        try {
          

          const config = {withCredentials:true, headers:{'Content-Type':'application/json'}}
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/views/views/${videoId}`,{}, config); 
          const {data:historyData} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/history/${videoId}`,{}, config);
          
        } catch (error) {
          console.log("error while adding view or history of this video", error);
        }
       }

       addViewAndHistory();
    },[videoId]);

  useEffect(()=>{

    if(!videoId){
      navigate("/");
    }

    const getComments=async()=>{
          
      
    try {
 
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/comment/c/${videoId}`,{withCredentials:true});
      setCommentsArray(data.data);

    } catch (error) {
      console.log("error in comments useeffect", error);
        
      
    }
  }
  getComments();
    
  },[videoId, navigate, commentLoading, isEdit, commentDelete]);




    // subscribe function

    const subscribe=async()=>{
      
      try {
 
        if(isSubscribe===false){
          setIsSubscribe(true);
         }
         else if(isSubscribe===true){
          setIsSubscribe(false);
         }
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subscription/subscribe/${video.owner._id}`, {withCredentials:true});
        
      } catch (error) {
        
        console.log("Error in subscribe ",error);
      }
    }

    const addComment=async()=>{
      if(comment.trim()===""){
        return;
      }

     try {
       const config = {withCredentials:true,headers:{'Content-Type':'application/json'}};
       
       setCommentLoading(true);
       const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/comment/c/${videoId}`, {comment}, config);
       if(data.data){
       setComment("");
       setCommentLoading(false);
       }
 
     } catch (error) {
      console.log("error in comment creating", error);
     }
    }
    

    // delete comment

    const removeComment =async(commentId)=>{
      try {
        setCommentDelete(true);
        const config ={withCredentials:true, headers:{'Content-Type':'application/json'}};
         const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/comment/c/${videoId}/comment/${commentId}`, config);
         setCommentDelete(false);
      } catch (error) {
        console.log("error while deleting comment", error);
        
      }
    }

    const uploadDate = (date)=>{
      const newDate = new Date(date);
      const options ={year:"numeric", month:"short", day:"numeric"};
      const convertedDate = newDate.toLocaleDateString('en-us', options);
      return convertedDate;
    } 
  return (
    <><div className=' flex flex-wrap bg-black h-full min-h-screen w-full '>
     { 
     video?<div className=' w-[100%] md:w-3/5 lg:w-3/4 px-2 md:px-4  lg:px-4 mt-2'>
      <video src={video.videoFile}
      className=' h-fit md:h-fit lg:h-140  w-full  rounded-xl bg-gray-950 outline-none'
      controls
      controlsList='nodownload'
      preload='auto'
      poster={video.thumbnail}
      autoPlay
      disablePictureInPicture
      />
        <div className='px-1 md:px-2 lg:px-2 mt-2'>
          <p className=' text-xl md:text-2xl lg:text-2xl text-white font-semibold'>{video.title}</p>
          <div className=' py-2 flex items-center   '>
           <div className='flex items-center gap-2 md:gap-4 lg:gap-4'>
            
            <Link to={`/channel/${encodeURIComponent(video.owner.username)}`}>
           <div className='rounded-full h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 bg-gray-700'>
            <img src={video.owner.avatar} alt="" className='rounded-full h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10' />
           </div>
           </Link>

           
          
          <Link to={`/channel/${encodeURIComponent(video.owner.username)}`}>
            <div>
        <p className=' text-md font-semibold text-gray-200 '>{video.owner.username}</p>
       <p className='text-gray-400 text-xs font-semibold'>{video.subscribers} subscribers</p>
        </div>
        </Link>
       
           
           <div>
            { user && user?._id !==video?.owner?._id &&
            <>{ isSubscribe && isSubscribe? <button className='px-4 py-2 text-white bg-gray-800 rounded-full ml-1 md:ml-2 lg:ml-2 cursor-pointer shadow-xl' onClick={subscribe} >unSubscribe</button>:
            <button className='px-4 py-2 text-black bg-gray-200 rounded-full ml-1 md:ml-2 lg:ml-2 cursor-pointer' onClick={subscribe}>Subscribe</button>
              }
            </>
             }
           </div>
           </div>
           
            <Like videoId={videoId}/>
           
            </div>
            
           
          </div>

          <div className='bg-gray-800 mt-2 rounded-lg px-1 md:px-2 lg:px-2 py-2'>
            <div className='text-md text-white flex gap-4'> 
              <p>{video.totalViews} views</p> <p>{uploadDate(video.createdAt)}</p>
            </div>
          <p className='text-gray-400 font-semibold'>Description</p>
          <p className='text-white font-semibold'>{video.description}</p>
          </div >
          {/* comment section  */}
          <div className='text-white mb-20' >
              <p className='text-xl mt-4 font-semibold'>({commentArray.length}) Comments</p>
              <div className='flex gap-2 items-center mt-2'>
               <img src={user?.avatar} alt="avatar" className='h-10 w-10 rounded-full ' /> 
               <input type="text" placeholder='write a comment' value={comment} onChange={(e)=>setComment(e.target.value)} className='border-b-1 border-white outline-none w-full px-2 py-1'  />
                <button className={comment.trim()!==""?'px-4 py-2 bg-gray-200 text-black rounded-full':'px-4 py-2 bg-gray-600 text-black rounded-full'} onClick={addComment} disabled={commentLoading}>comment</button>
              </div>


              {/* showing all comments */}
              <div>
                {
                      commentArray.length>0 &&
                      <div>
                        {
                          commentArray.map((comment)=>{
                            return <div key={comment._id} className='flex text-white gap-4 items-center justify-between mt-4   px-1 md:px-4 lg:px-4'>
                                {isEdit && commentID===comment._id?<EditComment commentData={comment} setIsEdit={setIsEdit}/>:<div className='flex gap-2 '>
                                <img src={comment.owner.avatar} alt="avatar" className='bg-green-700 h-10 w-10 rounded-full' />
                                <div>
                                  <p className='text-sm text-gray-400'>@{comment.owner.username}</p>
                                  <p className='text-lg text-gray-200'>{comment.comment}</p>

                                </div>
                                </div>}
                              { !isEdit && <div className='text-white flex gap-5'>
                                 <button className='text-white cursor-pointer' onClick={()=>{setIsEdit(true);setCommentID(comment._id)}} >Edit</button>
                                <button className={'remove text-white cursor-pointer'} onClick={()=>removeComment(comment._id)}>Remove</button>
                          
                                
                                
                               </div>}
                            </div>
                          })
                        }
                      </div>
                }
              </div>
          </div>
        </div>
        
        
        : video===null? 
        <div className='w-[100%] md:w-3/5 lg:w-3/4  px-4 flex '>
          <VideoLoader/>
        </div>
        :<div  className='w-[100%] md:w-3/5 lg:w-3/4   px-4 flex '>
         <div className='h-120 mt-6 w-full  rounded-xl bg-gray-700 flex items-center justify-center'>
         <p className='text-white text-3xl'>Video not Found</p>
         </div>
        </div>
}
        <div className=' w-[100%] md:w-2/5 lg:w-1/4 '>
               
         

       
        { videos && videos.length>0 && <div className=' flex flex-col gap-6 px-2 mt-2'>
          
          {
            videos.map((video)=>{
              return <SmallVideoCard video={video}/>
            })
          }
        </div>
      
        }
       
          

        </div>
    </div>
  </>)
}

export default VideoPlayer