import React, { useState } from 'react'
import { CostExploreList } from '../app/constant';
import Filter from '/tune.svg'
import Chart from '../components/Chart';
import BarChart from '/bar_chart.svg';
import ShowChart from '/show_chart.svg';
import StackedBarChart from '/stacked_bar_chart.svg';
import DateInput from '../components/DateInput';
import MoreBar from '../components/MoreBar';

const CostBoard = () => {
  const [costGroup, setCostGroup] = useState(CostExploreList[0]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [chartType,setChartType] = useState('mscolumn2d');
  return (
    <div className="w-[95%] content  m-3 border border-gray-300">
      <div className='flex bg-gray-100 relative border-b border-gray-200'>
        <div className='w-full flex flex-9 items-center gap-3  p-4 relative'>
          <div>Group By:</div>
          <div className='flex gap-3 text-xs'>
            <div className='p-1 px-4 rounded bg-blue-800 text-white'>
              {CostExploreList.find((item) => item === costGroup)}
            </div>
            <div className='w-0.5 bg-gray-300'></div>
            {CostExploreList.filter((item) => item !== costGroup).slice(undefined, 6).map((item, index) => {
              if (item === costGroup)
                return '';
              return <button onClick={() => setCostGroup(item)} className={` p-1 px-4 rounded hover:bg-blue-800 hover:text-white border-transparent bg-white text-blue-700`} key={index}>{item}</button>
            })}
            <MoreBar costGroup={costGroup} setCostGroup={setCostGroup}/>
          </div>
        </div>
        <div className="flex flex-3 gap-3 justify-between items-center mx-3">
          <div className='flex gap-2 items-center'>
            <DateInput/>
          </div>
          <button className='text-white bg-blue-800 rounded p-1 cursor-pointer' onClick={() => setFilterOpen(!filterOpen)}><img src={Filter}/></button>
        </div>
      </div>
      <div className='bg-white flex'>
        <div className={`flex flex-col w-full`}>
          <div className='flex justify-between items-center w-full px-3 py-2'><div>Charts</div>
          <div>
            <button className='p-1 px-4 rounded-s border border-gray-200 hover:bg-blue-100' onClick={()=>setChartType('mscolumn2d')}><img src={BarChart}/></button>
            <button className='p-1 px-4 border-t border-b border-gray-200 hover:bg-blue-100' onClick={()=>setChartType('msline')}><img src={ShowChart}/></button>
            <button className='p-1 px-4 rounded-e  text-white border border-gray-200 hover:bg-blue-100' onClick={()=>setChartType('stackedcolumn2d')}><img src={StackedBarChart}/></button>
          </div></div>
          <div className='border rounded border-gray-300 m-4'>
          <Chart type={chartType} width={filterOpen?'1000px':'1500px'}/>
          </div>
        </div>
        <div className={` ${filterOpen ? 'w-3/10 max-w-full duration-300' : 'w-0 max-w-0 duration-300'} overflow-x-hidden shadow-lg border-s border-gray-200`}>
          <div className='flex justify-between items-center p-3'><div>Filters</div><div className='text-xs text-blue-800'>Reset All</div></div>
          <div className=' flex flex-col overflow-y-auto text-xs'>
            {CostExploreList.map((item, index) => {
              if (index == CostExploreList.length - 1)
                return <div key={item} className='flex gap-4 py-3 m-2 items-center'><input className='border rounded h-4 w-4 checked:bg-blue-800 checked:text-white peer-checked:opacity-100 ' key={item.toLocaleLowerCase()} type="checkbox" name={item.toLocaleLowerCase()} id="" /><div>{item}</div></div>
              return <div key={item} className='flex gap-4 py-3 m-2 items-center border-b-2 border-gray-300'><input className='border rounded h-4 w-4 checked:bg-blue-800 checked:text-white peer-checked:opacity-100 ' key={item.toLocaleLowerCase()} type="checkbox" name={item.toLocaleLowerCase()} id="" /><div>{item}</div></div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CostBoard