import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UnauthenticatedUser from './UnauthenticatedUser';
import Loader from './Loader';
import axios from 'axios';
import ChannelCard from './ChannelCard';
axios
function SubscribedChannel() {
    const {loading, isAuthenticated, user} = useSelector((state)=>state.User);
    const [channels, setChannels] = useState([]);
    const [channelLoading, setChannelLoading] = useState(false);
   useEffect(()=>{
     const getChannels=async()=>{
        try {
            setChannelLoading(true);
            const {data} = await axios.get("/api/v1/subscription/subscribed");
            
            setChannels(data.data);
            setChannelLoading(false);
        } catch (error) {
            console.log("get channels error", error);
            setChannelLoading(false);
        }
     }
     getChannels();
   },[]);

  
    if(loading || channelLoading){
        return <Loader/>
    }

if(isAuthenticated){
    
  return (<> <title>Subscription</title>
      <div className='flex flex-col h-full min-h-screen w-full bg-black text-white   ' >
        <div className='px-2 md:px-12 lg:px-12  text-2xl font-semibold'>Subscribed Channels
            </div>

            <div className='w-full '>
                {
                    channels && channels.length>0? <div className='flex gap-2 mt-6 px-2 md:px-12 lg:px-12 flex-wrap'>
                        {
                            channels.map((channel)=>{
                                return <ChannelCard channel={channel} key={channel._id} />
                            })
                        }

                    </div>: <div className='h-full w-full flex items-center justify-center mt-20'>
          <div className='text-2xl text-gray-400'>

                 No  Channels Subscribed
               
          </div>
         </div>
                }
            </div>
        </div>
        </>

    )
}

return <UnauthenticatedUser/>

}


export default SubscribedChannel