import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setaccounts } from '../app/feature/accountReducer';
import ArrowDown from '/arrow_down.svg'
import { fetchApi } from '../axios/fetch';
import { toast } from 'react-toastify';
const MultipleAccountSelection = () => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showData, setShowData] = useState(false)
  const { accounts, role } = useSelector(state => state.auth.user);
  const [allAccounts, setAllAccounts] = useState(accounts);
  useEffect(() => {
    if (role === 'ADMIN' || role === 'READ_ONLY') {
      fetchApi.get('/admin/accounts')
        .then(response => {
          setAllAccounts(response.data);
        }
        ).catch((error) => {
          toast.error(error.response.data.message)
        })
    }

  }, [])

  const dispatch = useDispatch();
  const handleChange = (value, checked) => {
    if (checked) {
      setSelectedAccounts([...selectedAccounts, value]);
    }
    else {
      setSelectedAccounts(selectedAccounts => selectedAccounts.filter(a => a.accountId !== value.accountId));
    }
  }
  const handleApply = () => {
    dispatch(setaccounts(selectedAccounts));
  }
  const handleAll = (checked)=>{
    if(checked){
      setSelectedAccounts([...allAccounts]);
    }
    else{
      setSelectedAccounts([]);
    }
  }
  return (
    <div>
      <div className='text-xs flex items-center relative text-gray-600' onClick={() => setShowData(!showData)}>
        Accounts <img src={ArrowDown} alt="" />
      </div>
      {showData && <div className='flex flex-col text-xs absolute bg-gray-100 top-13 shadow-lg inset-shadow-lg rounded'>
        <div className='flex flex-col text-gray-600 max-h-48  min-w-32 overflow-auto'>
          <div className='flex items-center gap-3 m-2'>
          <input className='h-4 w-4 bg-transparent checked:accent-gray-100  hover:accent-gray-100' type="checkbox"
            checked={selectedAccounts.length === allAccounts.length }
            onChange={(e) => handleAll(e.target.checked)} /><div>Select All</div></div>
          {allAccounts.map((a) => {
            return <div className='flex items-center gap-3 m-2' key={a.accountId}>
              <input className='h-4 w-4 bg-transparent checked:accent-gray-100  hover:accent-gray-100' type="checkbox" name={a.accountId} id={a.accountId} value={a}
                checked={selectedAccounts.includes(a)}
                onChange={(e) => handleChange(a, e.target.checked)} />
              <div>{a.accountName}({a.accountId})</div></div>
          })}
        </div>
        <button className='bg-gray-800 self-end text-white px-2 py-1 rounded m-2' onClick={() => handleApply()}>
          Apply
        </button>
      </div>}
    </div>
  )
}

export default MultipleAccountSelection