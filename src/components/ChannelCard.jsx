import React, { useState } from 'react'
import axios from 'axios';

function ChannelCard({channel}) {
    
    const [isSubscribe, setIsSubscribe] = useState(true);
    
     const subscribe=async(channelId)=>{
          
          try {
     
            if(isSubscribe===false){
              setIsSubscribe(true);
             }
             else if(isSubscribe===true){
              setIsSubscribe(false);
             }
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subscription/subscribe/${channelId}`,{withCredentials:true});
            
          } catch (error) {
            
            console.log("Error in subscribe ",error);
          }
        }
        
  return (
  <div className="flex items-center w-[100%] md:w-[49%] lg:w-[49%]  px-4 py-3 border border-gray-700 rounded-lg justify-between bg-gray-900">
  
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
      <img 
        src={channel.channel.avatar} 
        alt="Channel avatar"
        className="w-full h-full object-cover" 
      />
    </div>

    <div className="flex flex-col text-white">
      <span className="font-semibold text-base sm:text-lg">{channel.channel.username}</span>
      <span className="text-md text-gray-400">{channel.subscriberCount} subscribers</span>
    </div>
  </div>

  {/* Right side: Subscribe Button */}
  { isSubscribe?<button onClick={()=>subscribe(channel.channel._id)} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-full hover:bg-gray-700 transition">
    Unsubscribe
  </button>
  :
  <button onClick={()=>subscribe(channel.channel._id)}  className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-full hover:bg-gray-100 transition">
    Subscribe
  </button>
}
</div>


  )
}

export default ChannelCard