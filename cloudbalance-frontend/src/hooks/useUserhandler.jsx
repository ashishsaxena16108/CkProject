import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DummyUsers } from '../users'
import { toast } from 'react-toastify';

const useUserhandler = (initialUserData={}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const [user, setUser] = useState(initialUserData);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${backendUrl}/admin/users`)
      .then(data => data.json())
      .then(data => setUsers(data))
      .catch(() => toast.error('Data not loaded'));

  }, [backendUrl]);

  const handleChange = useCallback((e, arg = '') => {
    let name;
    let value;

    if (e && e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = e;
      value = arg;
    }
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  }, [setUser])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    fetch(`${backendUrl}/admin/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => {
      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
      .then(() => {
        toast.success('Successfully Added');
        setUser({});
        navigate('/admin/users');
      })
      .catch(error => {
        toast.error('Error during POST request:', error);
      });

  }

  return { user, users, handleChange, handleSubmit }
}

export default useUserhandler