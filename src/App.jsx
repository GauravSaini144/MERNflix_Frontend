import Signup from './components/Signup'
import Login from './components/Login'
// import './App.css'
import {Toaster} from "react-hot-toast"
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearUserAllErrors, getCurrentUser, refreshToken } from './features/user/userApi'
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute'
import VideoPlayer from './components/VideoPlayer'
import LikedVideos from './components/LikedVideos'
import Navbar from './components/Navbar'
import SubscribedChannel from './components/SubscribedChannel'
import ChannelPage from './components/ChannelPage'
import CreateVideo from './components/CreateVideo'
import WatchLaterPage from './components/WatchLaterPage'
import History from './components/History'
function App() {
   const {isAuthenticated, loading, error} = useSelector((state)=>state.User);
   const dispatch = useDispatch();
   useEffect(()=>{
  dispatch(getCurrentUser());

  
}, [dispatch]);




const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (


    <>
    <Toaster position='top-right'/>
    { !shouldHideNavbar && <div className='bg-black sticky top-0 z-50' >
    <Navbar  />
    </div>}
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/register" element={<GuestRoute><Signup/></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login/></GuestRoute>} />
      <Route path="/video/:videoId" element={<VideoPlayer/>}/>
      <Route path='/liked-video' element={<LikedVideos/>}/>
      <Route path='/subscription' element={<SubscribedChannel/>}/>
      <Route path='/channel/:username' element={<ChannelPage/>}/>
      <Route path='/create' element={<CreateVideo/>} />
      <Route path='/watch-later' element={<WatchLaterPage/>} />
      <Route path='/history' element={<History/>} />

     </Routes>
    
    </>
  )
}

export default App
