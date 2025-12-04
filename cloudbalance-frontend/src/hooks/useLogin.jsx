import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/feature/authReducer.js';
import { adminCredentials } from '../app/constant.jsx';
import { showLoader } from '../app/feature/loadReducer.js';

const useLogin = () => {
    const [cred, setCred] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = useCallback(
      (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
       },
      [cred],
    )
    
    const handleLogin = () => {
        dispatch(showLoader());
        if(cred.email===adminCredentials.email && cred.password === adminCredentials.password){
            dispatch(login({ isLogin: true, role:'admin' }));
            navigate('/admin/users');
        }
        else{
            dispatch(login({ isLogin: true, role:'user' }));
            navigate('/user');
        }
        
    }
    return { cred, handleChange ,handleLogin };
}

export default useLogin