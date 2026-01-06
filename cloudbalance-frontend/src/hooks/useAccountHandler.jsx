import React, { useCallback, useState } from 'react'
import { fetchApi } from '../axios/admin/fetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../app/feature/loadReducer';
import { accountInputs } from '../app/constant';
import { validate } from '../app/helpers';

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
    const validateToContinue = ()=>{
        if(!validate(accountInputs,account)){
            toast.error('Fill details to continue');
            return false;
        }
        return true;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!validate(accountInputs,account)){
            toast.error('Give all details correctly');
            return;
        }
        dispatch(showLoader());
        fetchApi.post('/admin/add-account',account)
        .then(()=>{
            toast.success('Account added successfully');
            setAccount({accountArn:'',accountId:'',accountName:''});
            navigate('/admin/accounts');
        })
        .catch(error => {
                toast.error(error.response.data.message);
              })
        .finally(()=>{
                dispatch(hideLoader());
              })
    }
    return {account,handleChange,handleSubmit,validateToContinue}
}
