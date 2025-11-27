import React from 'react'
import { toast } from 'react-toastify';

const Copy = ({ valueToCopy }) => {
  const handleCopy = async () => { 
    try{
     await navigator.clipboard.writeText(valueToCopy);
     toast.success('Copied succesfully');
    } catch(error){
       toast.error('An error occured');
       console.log(error);
    }
   }
  return (
    <div className='group relative border-2  border-transparent rounded w-full focus:border-blue-600 hover:border-blue-600'>
    <pre className='bg-gray-100 max-h-48 overflow-y-auto inset-shadow-2xs  text-blue-600 p-4 ' >{valueToCopy}</pre>
    <button onClick={()=>handleCopy()} className='group-hover:bg-blue-600 rounded-lg text-blue-600 border-blue-600 border-2 group-hover:text-white  p-2 absolute right-2 top-2'>Copy</button>
    </div>
  )
}

export default Copy