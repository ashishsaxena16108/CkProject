import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/feature/authReducer.js';
import { showLoader } from '../app/feature/loadReducer.js';
import { toast } from 'react-toastify';
import { loginApi } from '../axios/loginApi.js';

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

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(showLoader());
        
        loginApi.post('/auth/login', cred)
        .then((response) => {
            const data = response.data; 

            if (!data.token) {
                toast.error(data.message);
                return; 
            }
            localStorage.removeItem('jwtToken');
            localStorage.setItem('jwtToken', data.token); 

            const role = data.user.role;
            dispatch(login({ isLogin: true, user: data.user }));
            toast.success(data.message);

            if (role === 'ADMIN' || role === 'READ_ONLY') {
                navigate('/admin/users');
            } else {
                navigate('/user');
            }
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed due to a network or server issue.');
                console.error('Login error:', error);
            }
        })

    }
    return { cred, handleChange, handleLogin };
}

export default useLogin