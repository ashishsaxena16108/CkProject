import React from 'react'
import InputFormElement from './InputFormElement'

const Form = React.memo(({inputs,children,handleChange,values,handleSubmit}) => {
  const gridClasses = inputs.length > 2 
    ? 'grid grid-cols-2 gap-4'
    : 'flex flex-col space-y-4 items-center';
  const submitHandler = (e)=>{
     if(handleSubmit)
       handleSubmit(e);
  }
  return (
    <form onSubmit={submitHandler} className='flex flex-col'>
      <div className={gridClasses}>
      {inputs.map((input,index)=>{
        const value = values && values[input?.for];
        return <InputFormElement key={index} value={value} userData={input} handleChange={handleChange}/>
      })}
      </div>
      {children}
    </form>
  )
})

export default Form