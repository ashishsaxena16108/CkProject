import React from 'react'
import Table from '../../components/Table.jsx';
import { userTableHeaders } from '../../app/constant.jsx';
import { Link } from 'react-router-dom';
import useUserhandler from '../../hooks/useUserhandler.jsx';

const Userboard = () => {
  const {users} = useUserhandler();
  return (
      <div className="w-[95%] content bg-white m-3 rounded-xl p-4">
        <div className="btns p-3 flex">
          <Link to={'/admin/adduser'} className='bg-blue-950 text-white rounded p-2 cursor-pointer'>Add New User</Link>
        </div>
        {users.length===0?<div>
          <div>No users in the app.</div>
          <div>Add users by clicking the button Add New User</div>
        </div>:
        <div className="table w-[98%]"><Table tableData={users} headers={userTableHeaders}/></div>}
      </div>
  )
}

export default Userboard