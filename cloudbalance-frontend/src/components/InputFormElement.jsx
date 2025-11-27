import React from 'react'
import { capitalizeFirstLetter,giveSpace } from '../app/helpers';
import Select from './Select';

const InputFormElement = ({ userData,handleChange,value }) => {

  return (
    <div className=' flex flex-col gap-4 w-full'>
      <label htmlFor={userData.for}>
        {giveSpace(capitalizeFirstLetter(userData.for))}
      </label>
      <div className=' border-2 border-gray-400 rounded-lg w-full'>
        {
          userData.type==='select'
          ? <Select className=' border-none p-3 focus:outline-none' id={userData.for} name={userData.for} options={userData.options} initialValue={value ? value : userData.initial} onSelect={handleChange}/>
          : <input id={userData.for} name={userData.for} className=' appearance-none w-full border-none p-3 focus:outline-none' onChange={(e)=>handleChange(e)} type={userData.type} placeholder={userData.placeholder} value={value}/>
        }
      </div>
    </div>
  )
}

export default InputFormElement