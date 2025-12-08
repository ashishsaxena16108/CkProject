import React, { useEffect } from 'react'
import CloudLogo from '/cloudlogo.png';
import Form from '../components/Form';
import { loginInputs } from '../app/constant.jsx';
import { hideLoader } from '../app/feature/loadReducer.js';
import useLogin from '../hooks/useLogin';
import { useDispatch } from 'react-redux';

const Login = React.memo(() => {
  const {handleChange,handleLogin} = useLogin();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(hideLoader());
  },[dispatch]);
  
  return (
    <div className=' mx-auto my-32 flex justify-center'>
      <div className="p-14 w-2/4 flex justify-center items-center flex-col">
      <div className=''>
        <div><img src={CloudLogo} alt="" width={250}/></div>
      </div>
      <div className='w-2/4'>
        <Form inputs={loginInputs} handleChange={handleChange}>
        <button className='w-full bg-blue-400 my-12 p-3' onClick={(e)=>handleLogin(e)}>Login</button>
        </Form>
      </div>
      </div>
    </div>
  )
})

export default Login