import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DummyUsers } from '../users'
import {fetchApi} from '../axios/admin/fetch';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { showLoader } from '../app/feature/loadReducer';

const useUserhandler = (initialUserData={}) => {
  const [user, setUser] = useState({
  ...initialUserData,
  accounts: initialUserData.accounts || [],
});
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUsers = useCallback(() => {
    fetchApi.get('/admin/users')
      .then(response => {
        setUsers(response.data?response.data:[]);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Data Not loaded');
      });
  }, []);

  const fetchAccounts = useCallback(() => {
    fetchApi.get('/admin/accounts')
    .then(response=>
      setAccounts(response.data?response.data:[])
    ).catch(()=>{
      toast.error('Accounts Not Loaded')
    })
  }, []);

  const handleChange = useCallback((e, arg = '') => {
  let name, value;

  if (e && e.target) {
    name = e.target.name;

    if (e.target.type === 'checkbox' && Array.isArray(user[name])) {
      const checked = e.target.checked;
      const accountId = e.target.value;

      value = checked
        ? [...user[name], JSON.parse(e.target.dataset.obj)]
        : user[name].filter(item => item.accountId !== accountId);
    } else {
      value = e.target.value;
    }
  } else {
    name = e;
    value = arg;
  }

  setUser(prev => ({ ...prev, [name]: value }));
}, [user, setUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoader());
    fetchApi.post(`/admin/add-user`,user).then(response => {
      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    })
      .then(() => {
        toast.success('Successfully Added');
        setUser({accounts:[]});
        navigate('/admin/users');
      })
      .catch(error => {
        toast.error('Error during POST request:', error);
      });

  }

  return { user, users,accounts, handleChange, handleSubmit ,fetchAccounts,fetchUsers}
}

export default useUserhandler