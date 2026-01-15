import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticateRoute = ({children}) => {
   const {isLogin,user} = useSelector((state)=>state.auth);
   if(!isLogin)
     return children;
   if(user.role==='USER')
     return <Navigate to='/user/costexplorer' replace/>
   else
     return <Navigate to='/admin/users' replace/>
  
}

export default AuthenticateRoute