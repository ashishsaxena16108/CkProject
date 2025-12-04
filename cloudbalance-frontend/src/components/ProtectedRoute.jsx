import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children,roleNeeded}) => {
  const {isLogin,role} = useSelector((state)=>state.auth);
  if(!isLogin){
    return <Navigate to='/login' replace/>;
  }
  if(roleNeeded!=='*' && role!==roleNeeded){
      return <Navigate to='*' state={{notaccesserror:true}} replace/>;
  }
  return children;
}

export default ProtectedRoute