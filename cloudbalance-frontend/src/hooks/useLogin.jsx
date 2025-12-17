import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/feature/authReducer.js';
import { hideLoader, showLoader } from '../app/feature/loadReducer.js';
import { toast } from 'react-toastify';
import { loginApi } from '../axios/loginApi.js';
import { loginInputs } from '../app/constant.jsx';
import { validate } from '../app/helpers.js';

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
        if (!validate(loginInputs,cred)) {
            toast.error('Give all details correctly');
            return;
        }
        dispatch(showLoader());

        loginApi.post('/auth/login', cred)
            .then((response) => {
                const data = response.data;

                if (!data.accessToken) {
                    toast.error(data.message);
                    return;
                }
                localStorage.removeItem('jwtToken');
                localStorage.setItem('jwtToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken)
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
            .finally(() => {
                dispatch(hideLoader());
            })

    }
    return { cred, handleChange, handleLogin };
}

export default useLogin