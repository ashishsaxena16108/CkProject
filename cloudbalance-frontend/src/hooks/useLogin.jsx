import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/feature/authReducer.js';
import { showLoader } from '../app/feature/loadReducer.js';
import { toast } from 'react-toastify';

const useLogin = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [cred, setCred] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = useCallback(
        (e) => {
            setCred({ ...cred, [e.target.name]: e.target.value });
        },
        [cred],
    )

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(showLoader());
        fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        }).then((response)=>response.json())
        .then((data)=>{
            if(!data.success)
                toast.error(data.message);
            let role=data.user.role;
            dispatch(login({ isLogin: true, user: data.user }));
            toast.success(data.message)
            if(role==='ADMIN' || role==='READ_ONLY')
              navigate('/admin/users');
            else
                navigate('/user');
        })

    }
    return { cred, handleChange, handleLogin };
}

export default useLogin