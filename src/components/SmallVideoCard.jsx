import React from 'react'
import { Link } from 'react-router-dom'
import WatchLater from './WatchLater'
function SmallVideoCard({video}) {
  const date = new Date(video.createdAt);
  const options = {year:"numeric", month:"short", day:"numeric"};
  const uploadDate = date.toLocaleDateString('en-us', options);
  const totalSeconds = Math.floor(video.duration);
  const minutes = Math.floor(totalSeconds/60);
  const seconds = totalSeconds%60;
  const videoDuration = `${minutes}:${seconds.toString().padStart(2,'0')}`;
  return (
     <Link to={`/video/${video._id}`}>
    <div className=' w-full h-25 flex gap-1 border-b-1 border-gray-700 '>
        <div className='relative w-2/4 h-25 '>
              <div className='absolute top-1 right-1 z-[40]'><WatchLater/></div>
               
        <img src={video.thumbnail} alt="" className=' h-25  w-full rounded-2xl border-b-1 border-gray-700 '  />
        <div className='absolute bottom-0 right-0 text-xs px-1 text-white bg-gray-900 hover:bg-gray-800'>{videoDuration}</div>
        </div>
        <div  className='w-2/4 h-25 '>
         <p className=' text-white text-md font-semibold'>{video.title}</p>
         <p className='text-gray-400 text-sm'>{video.owner.username}</p>
         <p className='text-gray-400 text-xs'>{video.totalViews} views</p>
         <p className='text-gray-400 text-xs'>{uploadDate}</p>

        </div>
        
    </div>
    </Link>
  )
}

export default SmallVideoCard


