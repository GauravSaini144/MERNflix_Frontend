import React from 'react'
import { useSelector } from 'react-redux'
import UnauthenticatedUser from './UnauthenticatedUser';
import Loader from './Loader';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateVideo() {
    const {loading, isAuthenticated, user} = useSelector((state)=>state.User);

    const [title, seTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [videoLoading, setVideoLoading] = useState(false);
    const navigate = useNavigate();
    const handleVideoFile =(e)=>{
       const file = e.target.files[0];

      if (!file) return;

     if (!file.type.startsWith("video/")) {
        toast.error("Please select a valid video file");
       return;
        }

  setVideo(file);
    }


    const handleImageFile=(e)=>{
         const file = e.target.files[0];

      if (!file) return;

     if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
       return;
        }

  setThumbnail(file);
    }


    const uploadVideo = async(event) =>{
   event.preventDefault();

   if(title.trim()===""){
    toast.error("video title required")
    return;
   }

   if(!video){
     toast.error("video required")
    return;
   }

   if(!thumbnail){
    toast.error("thumbnail required");
    return;
   }

   const formData = new FormData();
   formData.append("title", title);
   formData.append("description", description)
   formData.append("video", video);
   formData.append("thumbnail", thumbnail);
   
   try {
    setVideoLoading(true);
    
    
    const config = {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}};

    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/videos/upload-video`, formData, config);

    if(data.data){
        setVideoLoading(false);
        toast.success("video uploaded")
        navigate("/");
    }
   } catch (error) {
    
    console.log("Error in video upload ", error);
    setVideoLoading(false);
    
   }

    }


    if(loading){
        return <Loader/>


    }
 return (
  <> <title>Upload Video</title>
    {isAuthenticated ? (
      <div className="flex flex-col bg-black h-full min-h-screen w-full items-center px-4 py-6">
        
        <div className="self-center text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mt-4 text-center">
          Upload a video
        </div>

        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[55%] flex flex-col items-center justify-center mt-6">
          <form className="w-full flex flex-col gap-6" onSubmit={(e) => uploadVideo(e)}>

            {/* Video Title */}
            <div className="text-white flex flex-col gap-1 w-full">
              <label htmlFor="title" className="text-lg sm:text-xl text-gray-300">
                Video Title:
              </label>
              <input
                type="text"
                placeholder="video title"
                id="title"
                value={title}
                onChange={(e) => seTitle(e.target.value)}
                className="border border-gray-500 w-full px-2 py-2 outline-none focus:border-white text-sm sm:text-base"
              />
            </div>

            {/* Video Description */}
            <div className="text-white flex flex-col gap-1 w-full">
              <label htmlFor="description" className="text-lg sm:text-xl text-gray-300">
                Video Description
              </label>
              <textarea
                id="description"
                placeholder="video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="border border-gray-500 w-full px-2 py-2 outline-none focus:border-white text-sm sm:text-base"
              />
            </div>

            {/* File Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">

              {/* Upload Video */}
              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="video-upload" className="text-white text-sm sm:text-base">
                  Upload Video
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoFile(e)}
                  className="block w-full text-sm text-gray-400
                             file:mr-4 file:py-4 file:px-6
                             file:rounded-md file:border-0
                             file:text-md file:font-semibold
                             file:bg-gray-600 file:text-blue-100
                             hover:file:bg-gray-900 cursor-pointer"
                />
              </div>

              {/* Upload Thumbnail */}
              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="thumbnail-upload" className="text-white text-sm sm:text-base">
                  Upload Thumbnail
                </label>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFile(e)}
                  className="block w-full text-sm text-gray-400
                             file:mr-4 file:py-4 file:px-6
                             file:rounded-md file:border-0
                             file:text-md file:font-semibold
                             file:bg-gray-700 file:text-blue-100
                             hover:file:bg-gray-900 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            {videoLoading ? (
              <div className="text-white w-full sm:w-2/5 self-center mt-4 px-4 py-3 bg-red-500 text-white text-center hover:bg-red-600">
                Uploading...
              </div>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-2/5 self-center mt-4 px-4 py-3 bg-red-500 text-white text-center hover:bg-red-600"
              >
                Upload
              </button>
            )}
          </form>
        </div>

        {videoLoading && (
          <div className="text-white self-center mt-2 text-sm sm:text-base text-center">
            Video uploading, do not close or go back
          </div>
        )}
      </div>
    ) : (
      <UnauthenticatedUser />
    )}
  </>
);

}

export default CreateVideo