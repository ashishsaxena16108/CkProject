import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({children,roleNeeded}) => {
  const {isLogin,role} = useSelector((state)=>state.auth);
  console.log(role,' ',roleNeeded);
  if(!isLogin){
    return <Navigate to='/login' replace/>;
  }
  if(roleNeeded!=='*' && role!==roleNeeded){
      toast.error('You have no access to this link.');
      return <Navigate to='/login' replace/>;
  }
  return children;
}

export default ProtectedRoute