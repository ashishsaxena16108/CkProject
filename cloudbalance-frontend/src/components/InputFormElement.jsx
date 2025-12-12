import React, { useState } from 'react'
import { capitalizeFirstLetter,giveSpace } from '../app/helpers';
import Select from './Select';

const InputFormElement = ({ userData,handleChange,value}) => {
  const [error, setError] = useState('');
  const errorHandler = (e)=>{
      const errorMessage = "error" in userData ? userData.error(e.target.value):'';
      setError(errorMessage);
  };
  const onChange = (e)=>{
    errorHandler(e);
    handleChange(e);
  }
  return (
    <div className=' flex flex-col gap-4 w-full'>
      <div className=' flex justify-between items-start'>
      <label htmlFor={userData.for}>
        {giveSpace(capitalizeFirstLetter(userData.for))}
      </label>
      <div className='text-red-600'>
      {error && error}
      </div>
      </div>
      <div className={` border-2 ${error?'border-red-600':'border-gray-400'} rounded-lg w-full`}>
        {
          userData.type==='select'
          ? <Select className=' border-none p-3 focus:outline-none' id={userData.for} name={userData.for} options={userData.options} values={userData.values} initialValue={value ? value : userData.options[0]} onSelect={handleChange}/>
          : <input id={userData.for} name={userData.for} className=' appearance-none w-full border-none p-3 focus:outline-none' onChange={onChange} type={userData.type} placeholder={userData.placeholder} value={value}/>
        }
      </div>
    </div>
  )
}

export default InputFormElement