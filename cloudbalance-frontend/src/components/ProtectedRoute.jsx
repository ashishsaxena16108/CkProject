import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children,rolesNeeded}) => {
  const {isLogin,user} = useSelector((state)=>state.auth);
  if(!isLogin){
    return <Navigate to='/login' replace/>;
  }
  if(rolesNeeded && !rolesNeeded.includes(user.role)){
      return <Navigate to={'/noaccess'} state={{notaccesserror:true}} replace/>;
  }
  return children;
}

export default ProtectedRoute