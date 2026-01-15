import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { resourcesListMap } from '../app/constant'
import Table from '../components/Table'
import useResourceHandler from '../hooks/useResourceHandler'
import SectionLoader from '../components/costexplorercomponents/SectionLoader';

const ResourcesBoard = () => {
  const [resource, setResource] = useState(resourcesListMap.keys().next().value);
  const {getResources,ec2,asg,rds,loading} = useResourceHandler();
  useEffect(() => {
    getResources();
  }, [])
  
  return (
    <div>
        <div className='flex gap-3 m-4 text-xl w-full'>
            {resourcesListMap.keys().map((item,index)=>{
                let isActive=false;
                if(resource===item)
                    isActive=true
                return <button onClick={()=>setResource(item)} className={` p-1 px-4 rounded border-2  hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-transparent bg-white'}`} key={index}>{item}</button>
            })}
        </div>
        <div>
            {resourcesListMap.keys().map((item)=>{
                if(resource===item)
                   return <div key={item} className="w-[95%] h-[85%] content bg-white m-3 rounded-xl p-4">
        <div className="btns p-3 flex">
          Resources
        </div>
        {loading?<SectionLoader height={'h-50'}/>:
        <div className="table w-[98%]"><Table tableData={(resource==='EC2'?ec2:resource==='RDS'?rds:asg) || []} headers={resourcesListMap.get(item)}/></div>
            }
      </div>
            })}
        </div>
    </div>
  )
}

export default ResourcesBoard