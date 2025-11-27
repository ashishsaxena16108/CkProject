import React, { useState } from 'react'
import { CostExploreList } from '../app/constant';

const CostBoard = () => {
  const [costGroup, setCostGroup] = useState(CostExploreList[0]);
  return (
    <div className="w-[95%] content  m-3 rounded-xl p-4">
      <div className='flex bg-gray-100'>
      <div className='w-full flex flex-9 items-center gap-3  p-4'>
        <div>Group By:</div>
        <div className='flex gap-3 text-xs'>
                    {CostExploreList.map((item,index)=>{
                        let isActive=false;
                        if(costGroup===item)
                            isActive=true
                        return <button onClick={()=>setCostGroup(item)} className={` p-1 px-4 rounded hover:bg-blue-800 hover:text-white ${isActive ? 'text-white bg-blue-800' : 'border-transparent bg-white text-blue-700'}`} key={index}>{item}</button>
                    })}
          </div>
      </div>
      <div className="flex flex-3 gap-3 justify-between items-center">
        <div className='flex gap-2'>
        <input className='bg-white rounded p-1 border border-blue-800' type="date" name="start_date" id="" />
        <input className='bg-white rounded p-1 border border-blue-800' type="date" name="end_date" id="" />
        </div>
        <button className='text-white bg-blue-800 rounded p-1'>Filters</button>
      </div>
      </div>
      <div className='bg-white flex'>
        <div className='flex-9'>Charts</div>
        <div className='flex-3'>
          <div className='flex justify-between items-center p-3'><div>Filters</div><div className='text-xs text-blue-800'>Reset All</div></div>
          <div className=' flex flex-col'>
            {CostExploreList.map((item)=>{
                        return <div key={item} className='flex gap-4 py-3 m-2 items-center border-b-2 border-gray-300'><input className='border rounded h-5 w-5 checked:bg-blue-800 checked:text-white peer-checked:opacity-100 ' key={item.toLocaleLowerCase()} type="checkbox" name={item.toLocaleLowerCase()} id="" /><div>{item}</div></div>
                    })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CostBoard