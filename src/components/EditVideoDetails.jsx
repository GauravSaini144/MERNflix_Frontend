import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function EditVideoDetails({video ,setIsEdit}) {
    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(video.description);
    const [thumbnail, setThumbnail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

     const handleImageFile=(e)=>{
         const file = e.target.files[0];

      if (!file) return;

     if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
       return;
        }

  setThumbnail(file);
    }

    const editVideo = async()=>{
      setError("");
      if(title.trim()===""){
        setError("Title should not be null");
        return;
      }
      if(description.trim()===""){
        setError("Description should not be null");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      try {
        setLoading(true);
        const config = {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}};
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/videos/update-video/${video._id}`, formData, config);
        if(data.data){
          setLoading(false);
          toast.success("Video details updated");
          
          setIsEdit(false);
          
        }

        
        
      } catch (error) {
        setError(error.response?.data?.message);
        console.log("Error in video edit , ", error);
        setLoading(false);

      }
    }

  return (<><div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={()=>setIsEdit(false)} // close when clicking outside
      ></div>
     <div className=' fixed w-[90%] z-[40] h-[90%] md:w-[80%] md:h-[80%] lg:w-[70%] lg:h-[70%] bg-gray-800 self-center top-[15%]   flex flex-col justify-center items-center'>
      <div className='text-xl font-semibold text-gray-200 mb-6'>Edit video details</div>
        <div className='flex flex-col gap-4 text-white w-[85%]  md:w-[60%] lg:w-[55%] '>
            <div className='flex flex-col gap-2'>
            <label htmlFor="fullname" className='text-gray-300 text-lg'>title: </label>
            <input type="text" id='fullname' placeholder='fullname' value={title} onChange={(e)=>setTitle(e.target.value)} className={ title.trim()===""?'border-1 border-red-500 px-2 py-2 outline-none ':'border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300 '}/>
            </div>
            <div className='flex flex-col  '>
              <label htmlFor="desc" className='text-gray-300 text-lg'>Description: </label>
            <textarea type="text" id="desc" placeholder='email' rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} className={ description.trim()===""?'border-1 border-red-500 px-2 py-2 outline-none ':'border-1 border-gray-500 px-2 py-2 outline-none focus:border-gray-300'} />
            </div> 

             <div className="flex flex-col gap-1  ">
                 <label
                  htmlFor="file-upload"
                  className=""
                    >
                     Upload Thumbnail
                  </label>
                <input
                       id="file-upload"
                     type="file"
                     accept="image/*"
                     onChange={(e)=>handleImageFile(e)}
                    className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-4 file:px-6
                    file:rounded-md file:border-0
                    file:text-md file:font-semibold
                    file:bg-gray-700 file:text-blue-100
                     hover:file:bg-gray-900
                    cursor-pointer"
                />
           </div>
             <div className='text-white flex gap-2 mt-4  '>
         <button disabled={loading} className='px-4 py-1 bg-gray-900 rounded-full text-lg hover:bg-gray-800 ' onClick={()=>setIsEdit(false)}>cancel</button>

        <button className='px-4 py-1 bg-gray-300 rounded-full text-lg text-black hover:bg-gray-200' onClick={editVideo}>{loading?'updating...':'Update'}</button>
            
        </div>
 
        <div className='text-white self-center'>{loading && 'updating do not close'}</div>
        <div className='h-6 self-center mt-4 text-red-400'>{error}</div>
        </div>
       
    </div>
    </>
  )
}

export default EditVideoDetails