import React, { useEffect } from 'react'
import Table from '../../components/Table.jsx';
import { userTableHeaders } from '../../app/constant.jsx';
import { Link } from 'react-router-dom';
import useUserhandler from '../../hooks/useUserhandler.jsx';
import { useSelector } from 'react-redux';

const Userboard = () => {
  const {users,fetchUsers} = useUserhandler();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])
  
  const {role} = useSelector(state=>state.auth.user);
  return (
      <div className="w-[95%] content bg-white m-3 rounded-xl p-4">
        <div className="btns p-3 flex">
          {role==='ADMIN'&&<Link to={'/admin/adduser'} className='bg-blue-950 text-white rounded p-2 cursor-pointer'>Add New User</Link>}
        </div>
        {users.length===0?<div className='flex flex-col justify-center items-center m-28'>
          <div className='text-xl font bold'>No users in the app.</div>
          <div className='text-gray-400 m-4'>Add users by clicking the button Add New User</div>
        </div>:
        <div className="table w-[98%]"><Table tableData={users} headers={userTableHeaders}/></div>}
      </div>
  )
}

export default Userboard