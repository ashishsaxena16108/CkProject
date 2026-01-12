import React from 'react'
import Edit from '/edit.svg'
import Delete from '/delete.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ActionData = ({data}) => {
  const {role} = useSelector(state=>state.auth.user);
  return (
    <>
    {role==='ADMIN' ? <div className='flex justify-center gap-10'>
        <Link to='/admin/adduser' state={{data:data}}><img src={Edit} alt="edit"/></Link>
    </div>:<div></div>
    }
    </>
  )
}

export default ActionData