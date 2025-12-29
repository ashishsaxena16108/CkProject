import React,{useState,useEffect,useRef} from 'react'
import ArrowDown from '/arrow_down.svg'
import { CostExploreList } from '../app/constant';

const MoreBar = ({costGroups,handleGroupButton}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const pickerRef = useRef(null);
      useEffect(() => {
          function handleClickOutside(event) {
              if (open && pickerRef.current && !pickerRef.current.contains(event.target)) {
                  setMoreOpen(false);
              }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
              document.removeEventListener('mousedown', handleClickOutside);
          };
      }, [moreOpen]);
  return (
    <div>
        <button className='flex items-center text-blue-800' onClick={()=>setMoreOpen(!moreOpen)}>More <span
              className={`transition-transform ${moreOpen ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true" ><img src={ArrowDown} alt="" /></span></button>
          
          {moreOpen?<div ref={pickerRef} className='absolute flex  flex-col z-10 right-60 top-10 rounded font-light text-xs'>
          <div className='mx-2 self-end w-0 border-b-12 border-b-white border-l-6 border-l-transparent border-r-6 border-r-transparent'></div>
            <ul className='bg-white p-2'>
              {costGroups.slice(6,undefined).map((item)=>{
            return <li key={item} onClick={() => handleGroupButton(item)} className='p-2 hover:bg-blue-200'>{item}</li>
          })}
          </ul>
          </div>:''}
    </div>
  )
}

export default MoreBar