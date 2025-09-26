import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { clearUserAllErrors, getCurrentUser, loginUser } from '../features/user/userApi';

function Login() {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const {loading, isAuthenticated, error} = useSelector((state)=>state.User);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  useEffect(()=>{
  if(isAuthenticated){
    navigate(from, {replace:true});
  }
}, [isAuthenticated]);
    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch(clearUserAllErrors());
      }
    },[dispatch, error]);


  const handleSubmit = (event) =>{

    event.preventDefault();
       if(identifier.trim()===""){
        toast.error("email or username required");
        return;
       }
       if(password.trim()===""){
        toast.error("password required");
        return;
       }

       dispatch(loginUser(identifier, password));

       
  }
return (<> <title>Sign in</title>

  <div className="bg-black fixed flex flex-col items-center justify-center min-h-screen w-full gap-6 px-4 py-6">

    
    <div className="relative font-bold text-2xl sm:text-3xl md:text-4xl text-center text-white">
      Sign in on <span className='text-cyan-300 font-semibold'>MERNflix</span>
    </div>

   

    
    <form
      action=""
      className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="*Username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white bg-transparent text-sm sm:text-base"
      />
      <input
        type="password"
        placeholder="*Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 text-white placeholder-gray-300 border-b-1 outline-none border-gray-500 focus:border-white bg-transparent text-sm sm:text-base"
      />


      <div className="ml-auto px-2 sm:px-6 text-gray-300 text-sm sm:text-base">
        don’t have an account?&nbsp;
        <Link to={"/register"}>
          <span className="text-blue-400 underline">Register</span>
        </Link>
      </div>

      
      <button className="bg-red-600 p-2 rounded-md text-sm sm:text-base text-white hover:bg-red-400"  >Sign in</button>
    </form>
  </div>
  </>
);


}

export default Login