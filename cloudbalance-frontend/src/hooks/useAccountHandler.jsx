import React, { useCallback, useState } from 'react'
import { fetchApi } from '../axios/admin/fetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoader } from '../app/feature/loadReducer';

export const useAccountHandler = () => {
   const [account, setAccount] = useState({accountArn:'',accountId:'',accountName:''});
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleChange = useCallback(
           (e) => {
               setAccount({ ...account, [e.target.name]: e.target.value });
           },
           [account],
       )
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(showLoader());
        fetchApi('/admin/add-account',account)
        .then(()=>{
            toast.success('Account added successfully');
            setAccount({});
            navigate('/admin/accounts');
        })
    }
    return {account,handleChange,handleSubmit}
}
