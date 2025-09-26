import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from "react-redux"
import { clearSignupAllError, signup } from '../features/user/signupApi';

function Signup() {
  const {loading, error, isSignedUp} = useSelector((state)=>state.Signup);
  const {isAuthenticated} = useSelector((state)=>state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  
  if(isAuthenticated){
    navigate("/home");
  }
  useEffect(()=>{
 
    if(error){
      toast.error(error);
      dispatch(clearSignupAllError());
    }

    if(isSignedUp){
      navigate("/login");
      
    }

  },[error,isSignedUp ]);

  const register = (event) =>{
    event.preventDefault();
    if(email.trim()==="" && username.trim()==="" && fullname.trim()==="" && password.trim()==="" && avatar ===""){
      toast.error("Email, username, fullname, password, avatar required");
      return;
    }
    
    if(email.trim()===""){
      toast.error("Email Required");
      return;
    }
    
    if(username.trim()===""){
      toast.error("Username Required");
      return;
    }
    
    if(fullname.trim()===""){
      toast.error("Fullname Required");
      return;
    }
    
    if(password.trim()===""){
      toast.error("Password Required");
      return;
    }
    
    if(avatar===""){
      toast.error("Avatar Required");
      return;
    }
      dispatch(signup(email, username, fullname, password, avatar, coverImage));
    
   
  }
return (<> <title>Register</title>
  <div className="bg-black fixed flex flex-col items-center justify-center min-h-screen w-full gap-6 px-4 py-6">


    <div className="relative font-bold text-2xl sm:text-3xl md:text-4xl text-center text-white mb-2">
      Register on <span className='text-cyan-300 font-semibold'>MERNflix</span>
    </div>

    

    
    <form
      action=""
      className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md"
      onSubmit={register}
    >
      <input
        type="email"
        placeholder="*Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="*Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="*Fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white text-sm sm:text-base"
      />
      <input
        type="password"
        placeholder="*Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white text-sm sm:text-base"
      />

      
      <div className="border-b-1 outline-none p-2 flex flex-col sm:flex-row justify-between border-gray-500 gap-2">
        <label className="text-gray-300 text-sm sm:text-base">*Avatar</label>
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="sm:w-[60%] w-full text-gray-400 text-sm sm:text-base"
        />
      </div>

      
      <div className="border-b-1 outline-none p-2 flex flex-col sm:flex-row justify-between border-gray-500 gap-2">
        <label className="text-gray-300 text-sm sm:text-base">Cover image</label>
        <input
          type="file"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="sm:w-[60%] w-full text-gray-400 text-sm sm:text-base"
        />
      </div>

     
      <div className="ml-auto px-2 sm:px-6 text-gray-300 text-sm sm:text-base">
        Already have an account?&nbsp;
        <Link to={"/login"}>
          <span className="text-blue-400 underline">Sign in</span>
        </Link>
      </div>

      
      <button className={ "bg-red-600 p-2 rounded-md text-sm sm:text-base text-white hover:bg-red-400 flex items-center justify-center "} disabled={loading}>{!loading ?"Register":<div className='flex  w-5 h-5 border-2 border-red-100 border-b-gray-700 rounded-full animate-spin'></div>}</button>

   
      
    </form>
  </div>
  </>
);


}

export default Signup