import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {DummyUsers} from '../users'

const useUserhandler = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState(DummyUsers);
  const navigate = useNavigate();
  
  const handleChange = useCallback((e,arg='') => {
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
    },[setUser])
  
  const handleSubmit = ()=>{
    setUsers([...users,user]);
    DummyUsers.unshift(user);
    setUser({});
    navigate('/admin/users');
  }
  return {user,users,handleChange,handleSubmit}
}

export default useUserhandler