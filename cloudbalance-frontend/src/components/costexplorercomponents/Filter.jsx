import React, { useState } from 'react'
import { CostExploreList } from '../../app/constant';
import SectionLoader from './SectionLoader';
import { fetchApi } from '../../axios/admin/fetch';
import { useSelector } from 'react-redux';

const Filter = ({ item,open,index,setIndex,fetchReports }) => {
  const [filters, setFilters] = useState([]);
  const [checkedFilters,setCheckedFilters] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {role} = useSelector(state=>state.auth.user);
  const {accounts} = useSelector(state=>state.accounts);
  const clickHandler = () => {
    setIndex(open?-1:index);
    setIsLoading(true);
    const backendgroupby=item.toLowerCase().replace(' ','_');
    fetchApi.get(`/${role==='ADMIN'||role==='READ_ONLY'?'admin':'user'}/filters?group_by=${backendgroupby}${accounts.length===0?'':`&accountIds=${accounts.join(',')}`}`)
    .then(response=>{
       setFilters(response.data);
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }
  const handleApply = ()=>{
     fetchReports(item,checkedFilters);
     setIndex(-1);
     setCheckedFilters([]);
  }
  const handleChange = (value,checked)=>{
     if(checked){
      setCheckedFilters([...checkedFilters,value]);
     }
     else{
       setCheckedFilters(checkedFilters.filter(item=>item!==value))
     }
  }
  return (
    <div className={`${open ? 'shadow-lg border-2 rounded border-gray-100' : ''} p-2`}>
      <div className={`flex gap-4 m-2 items-center justify-between`}>
        <div className='flex gap-4'>
          <input className='border rounded h-4 w-4 checked:bg-blue-800 checked:text-white peer-checked:opacity-100 ' checked={checkedFilters.length!==0} key={item.toLocaleLowerCase()} type="checkbox" name={item.toLocaleLowerCase()} id="" disabled />
          <div onClick={() => clickHandler()}>{item}</div>
        </div>
        <div className=' italic text-gray-400'>Include Only</div>
      </div>
      <div className='h-[0.25px] bg-gray-300'></div>
      {open && <div className='flex flex-col gap-2'>
        <div className='border-b border-gray-400'>
          <input type="text" className='border border-gray-200 m-2 w-11/12 rounded p-2' placeholder='Search' />
        </div>
        { isLoading ? <SectionLoader height={'h-36'}/> :
        <div className='max-h-40 overflow-scroll mx-2'>
          {filters.map((f)=>(
             <div key={f} className='flex gap-3 py-1 items-center'>
              <input className='border rounded h-4 w-4 checked:bg-blue-800 checked:text-white peer-checked:opacity-100 ' checked={checkedFilters.includes(f)} onChange={(e)=>handleChange(f,e.target.checked)}  type="checkbox" name={f} id=""  />
                <div>{f}</div>
             </div>
          ))}
        </div>
        }
        <div className=' self-end flex gap-4'>
          <button className='bg-blue-800 text-white p-2 rounded' onClick={() => handleApply()}>Apply</button>
          <button className='bg-blue-800 text-white p-2 rounded' onClick={() => setIndex(-1)}>Cancel</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Filter