import React, { useState } from 'react'
import { CostExploreList } from '../../app/constant'
import Filter from '../costexplorercomponents/Filter'

const FilterSection = ({filterOpen,fetchReports,handleCostGroup}) => {
  const [index,setIndex] = useState(-1);
  return (
    <div className={` ${filterOpen ? 'w-3/10 max-w-full duration-300' : 'w-0 max-w-0 duration-300'} overflow-x-hidden shadow-lg border-s border-gray-200`}>
          <div className='flex justify-between items-center p-3'><div>Filters</div><div className='text-xs text-blue-800 cursor-pointer' onClick={()=>{setIndex(-1);handleCostGroup() }}>Reset All</div></div>
          <div className=' flex flex-col overflow-y-auto text-xs'>
            {CostExploreList.map((item,i) => {
              return <Filter handleCostGroup={handleCostGroup} fetchReports={fetchReports} key={item} item={item} index={i} setIndex={setIndex} open={index===i}/>
            })}
          </div>
        </div>
  )
}

export default FilterSection