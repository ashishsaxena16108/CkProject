import React, { useState } from 'react'
import CloudLogo from '/cloudlogo.png'
import Info from '/info.svg'
import Group from '/group.svg'
import Logout from '/logout.svg'
import Menu from '/menu.svg'
import { useDispatch } from 'react-redux'
import { logout } from '../app/feature/authReducer'
const Navbar = ({ handleBtn }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className='flex h-[90px] shadow-xl z-10 items-center w-full bg-white '>
      <div className='flex items-center justify-center'>
        <img className='mx-10' src={CloudLogo} alt="" width={300} />
      </div>
      <div className='w-6/7 flex justify-between'>
        <div className='flex items-center' onClick={()=>handleBtn()}>
          <img src={Menu} alt="" />
        </div>
        <div className='w-1/4 p-5 flex justify-between items-center'>
          <div className='flex items-center gap-1.5'>
            <div className='border border-blue-600 rounded-4xl p-2 bg-blue-50 shadow-lg shadow-blue-300'><img src={Group} alt="" /></div>
            <div>
              <div className='text-sm'>Welcome,</div>
              <div className='text-blue-500 text-xl flex justify-center'>Ashish Saxena <img onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} className='inline ms-1' src={Info} alt="" /></div>
              </div>

          </div>
          <div className="line bg-gray-200 w-0.5"></div>
          <div><button onClick={() => handleLogout()} className='flex border border-blue-600 text-blue-600 rounded-xl font-bold shadow-sm shadow-blue-400 p-2.5'><img src={Logout} alt="" />Logout</button></div>
        </div>
      </div>
      {isHover &&
        <div className='flex flex-col fixed right-40 top-18'>
          <div className=' bg-gray-200 rounded-t-full self-end'>e</div>
          <div className='bg-gray-200 '>egefcevefe</div>
        </div>}
    </div>
  )
}

export default Navbar