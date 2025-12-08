import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Folder from '/open-folder.png'
import { useSelector } from 'react-redux';

const AccountsBoard = () => {
  const [accounts, setAccounts] = useState([]);
  const {role} = useSelector(state=>state.auth.user);
  return (
    <div className='w-[95%] relative h-full content bg-white m-3 rounded-xl p-4'>
      {accounts.length!==0 ? 'All Accounts': <div className='flex flex-col justify-center items-center m-28'><img width={240} src={Folder} alt="" /><div className='text-xl font bold'>You have no accounts linked.</div> 
      <div className='text-gray-400 m-4'>Click below to start linking your accounts</div>
      {role==='ADMIN' && <Link to='/admin/accounts/onboarding' className='bg-blue-700 text-white m-4 p-3 px-7 rounded-lg'>Link Account</Link>}
      </div>}
    </div>
  )
}

export default AccountsBoard