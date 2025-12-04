import React, { useEffect } from 'react'
import notFound from '../assets/404-error.png';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { hideLoader } from '../app/feature/loadReducer';

const NotFound = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const notAccessError = location.state.notaccesserror;
  useEffect(()=>{
     if(notAccessError)
        toast.error('You have not access to this link');
     dispatch(hideLoader());
  },[notAccessError,dispatch])
  return (
     <div className='notfound flex justify-center items-center text-7xl font-bold mt-50'>
      <img src={notFound} width={200}/> <div>Not Found</div>
    </div>
  )
}

export default NotFound