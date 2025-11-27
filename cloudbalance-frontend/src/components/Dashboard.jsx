import React from 'react'
import { pathTitleMap} from '../app/constant.jsx'
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

const Dashboard = () => {
  
  const location = useLocation();

  return (
    
      <div className=" w-6/7  overflow-scroll">
        <div className="breadcrumb h-[7%] m-3">
          <Breadcrumb />
          <div className=' text-3xl m-4'>{pathTitleMap.get(location.pathname.split('/').findLast((x)=>x))}</div>
        </div>
        <div className=' w-full h-[1.5px] bg-gray-300'></div>
        <div>
        <Outlet />
        </div>
      </div>
  )
}

export default Dashboard