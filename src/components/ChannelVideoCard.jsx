import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import EditVideoDetails from './EditVideoDetails';
import WatchLater from './WatchLater';
import { useSelector } from 'react-redux';
import DeleteVideo from './DeleteVideo';
function ChannelVideoCard({video, setIsUpdated}) {
    const {user, isAuthenticated} = useSelector((state)=>state.User);
    
    const [openEdit, setOpenEdit] = useState(false);
    
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const date = new Date(video.createdAt);
    const options ={year:"numeric", month:"short", day:"numeric"};
    const uploadDate = date.toLocaleDateString('en-us', options);

    const totalSeconds = Math.floor(video.duration);
    const minutes = Math.floor(totalSeconds/60);
    const seconds =totalSeconds%60;
    const videoDuration = `${minutes}:${seconds.toString().padStart(2,'0')}`;

  return (
<>
{
    isEdit && <EditVideoDetails setIsEdit={setIsEdit} video={video} />

}
{
    isDelete && <DeleteVideo setIsUpdated={setIsUpdated} setIsDelete={setIsDelete} videoId={video._id} setIsEdit={setIsEdit} />
}

    <div className=' w-full  h-48 min-h-fit border-1 border-gray-700  hover:border-gray-500 relative'>
        
        <div className=' relative h-[70%] w-full overflow-hidden border-b-1 border-gray-700 relative '>
            {!(user._id === video.owner) && <div className='absolute top-1 right-1'> <WatchLater videoId={video._id}/></div>}
            <Link to={`/video/${video._id}`}>
            <img src={video.thumbnail} alt="thumbnail" className='w-full h-full object-fit' />
            </Link>
             <Link to={`/video/${video._id}`}><p className='px-2 bg-gray-900 text-xs  text-white font-semibold absolute z-20 bottom-1 right-0'>{videoDuration}</p></Link>
        </div>
        <div className='h-[30%] w-full px-2 mt-1'>
            <Link to={`/video/${video._id}`}><div className='text-gray-100 text-md font-semibold truncate'>{video.title}</div></Link>
            <Link to={`/video/${video._id}`}><div className='text-gray-300 text-xs flex gap-2 mt-1'> <span>{video.totalViews} views</span><span>{uploadDate}</span></div></Link>
        </div>
        
        {user._id === video.owner && <div className='absolute bottom-1 text-white right-1 cursor-pointer'> <div className='relative'><i onClick={()=>setOpenEdit((prev)=>!prev)} className="fa-solid fa-ellipsis-vertical "> </i> 
         
        {openEdit && <div className='flex flex-col absolute top-6 right-0'> <div className=' bg-gray-900 px-4 py-1 hover:bg-gray-800 z-[32]' onClick={()=>{setIsEdit(true); setOpenEdit(false)}}>Edit</div> 
        
        <div className=' bg-red-600 px-4 py-1 hover:bg-red-500 z-[32]' onClick={()=>setIsDelete(true)}>Delete</div>
        
         </div>}
         </div> </div>}

 
 
    </div>
   </>
)
}

export default ChannelVideoCard