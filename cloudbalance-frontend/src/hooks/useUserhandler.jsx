import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DummyUsers } from '../users'
import { fetchApi } from '../axios/fetch';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../app/feature/loadReducer';
import { addUserInputs } from '../app/constant';
import { validate } from '../app/helpers';

const useUserhandler = (initialUserData = { firstName: '', lastName: '', email: '', role: '', accounts: [] }) => {
  const [user, setUser] = useState({
    ...initialUserData,
    accounts: initialUserData.accounts ? initialUserData.accounts : [],
  });
  const userRef = useRef({
    ...initialUserData,
    accounts: initialUserData.accounts ? initialUserData.accounts : [],
  })
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const fetchUsers = useCallback(() => {
    fetchApi.get('/admin/users')
      .then(response => {
        setUsers(response.data ? response.data : []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }, []);

  const fetchAccounts = useCallback(() => {
    fetchApi.get('/admin/accounts')
      .then(response => {
        setAccounts(response.data);
      }
      ).catch((error) => {
        toast.error(error.response.data.message)
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

  const areAccountsEqual = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    const idsA = a.map(x => x.id).sort();
    const idsB = b.map(x => x.id).sort();
    return idsA.every((id, i) => id === idsB[i]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(addUserInputs(true), user)) {
      return;
    }

    dispatch(showLoader());

    const payload = { ...user };

    if (areAccountsEqual(user.accounts, userRef.current.accounts)) {
      payload.accounts = null;
    }

    fetchApi.post(`/admin/add-user`, payload)
      .then(response => {
        if (response.status !== 201) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      })
      .then(() => {
        toast.success('Successfully Added');
        setUser(userRef.current);
        navigate('/admin/users');
      })
      .catch(error => {
        toast.error(error.response.data.message);
        setUser(userRef.current);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };


  const handleCancel = () => {
    setUser(userRef.current);
    navigate(-1);
  }

  return { user, users, accounts, handleChange, handleCancel, handleSubmit, fetchAccounts, fetchUsers }
}

export default useUserhandler