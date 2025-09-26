import React from 'react'
import { Link } from 'react-router-dom'
import WatchLater from './WatchLater'
function VideoCard({video, setIsChanged, history=false, historyDate}) {

  const options ={year:"numeric", month:"short", day:"numeric"};
 const date = new Date(video.createdAt);
  const uploadDate = date.toLocaleDateString('en-us', options);
  const newDate = new Date(historyDate);
const historyTime = newDate.toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
});


const totalSeconds = Math.floor(video.duration);
const minutes = Math.floor(totalSeconds/60);
const seconds = totalSeconds%60;

const videoDuration = `${minutes}:${seconds.toString().padStart(2,'0')}`;
  return (<>
    <Link to={`/video/${video._id}`}>
    <div className='relative  h-80  w-[100%]   border-1 border-gray-600 hover:border-gray-300  '> 
      <div className='absolute top-1 right-1 z-[40]'><WatchLater videoId={video._id} setIsChanged={setIsChanged}/></div>
        <div className='relative border-1 border-gray-600 hover:border-gray-300' >
     
  <img  src={video.thumbnail} alt="thumbnail" className='h-50  w-full object-fit bg-gray-900' />
      <div className='absolute bottom-0 right-0 px-1 bg-gray-900 text-white hover:bg-gray-800 z-[30]'>{videoDuration}</div>
        </div>
        <div className='flex mt-2 gap-1 px-2 py-1'>

         <div className='rounded-full w-12'>
           <img src={video.owner.avatar} alt="" className='h-10 w-10 rounded-full' />
         </div>
          <div>
        <div className='text-white'>
              <p >{video.title}</p>
        </div>
        <div className='text-gray-300 text-sm'>
          {video.owner.username}
        </div>
        <div className='text-gray-300 text-xs flex gap-2 '>
          <div className=''>{video.totalViews} views</div>
          <div className=' ' >
            {
              uploadDate
              
            }
          </div>
        </div>
        </div>
        </div>

        { history && <div className='absolute bottom-1 right-1 text-green-200'> 
          
         {
          historyTime
         }

        </div>
        }
        
    </div>

    </Link>
    
    </>
  )
}

export default VideoCard