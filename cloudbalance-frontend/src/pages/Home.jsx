import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { hideLoader } from '../app/feature/loadReducer'

const Home = () => {
  const role  = useSelector((state) => state.auth.user.role);
  const [open, setopen] = useState(true);
  const dispatch = useDispatch();
  const handleBtn = ()=>{
      setopen(!open);
  }
  useEffect(() => {
    const timeout = setTimeout(()=>{
        dispatch(hideLoader());
    },1500)
    return ()=>{
      clearTimeout(timeout);
    }
  }, [dispatch])
  
  return (
    <div className='font-bold h-screen flex flex-col bg-gray-200 '>
        <Navbar  handleBtn={handleBtn}/>
        <div className=' grow'>
        <div className='w-full h-[calc(100vh-75px)] flex bg-gray-200 '>
          <div className={`${open?'w-1/6':'w-14'} h-full bg-white  inline-block transition-all duration-300 ease-in-out`}>
            <SideBar open={open} isAdmin={role==='ADMIN' || role==='READ_ONLY'} />
          </div>
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Home