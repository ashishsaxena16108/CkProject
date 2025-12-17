import React, { useEffect } from 'react'
import { addUserInputs } from '../../app/constant.jsx'
import Form from '../../components/Form.jsx'
import useUserhandler from '../../hooks/useUserhandler.jsx'
import { useLocation } from 'react-router-dom'

const AddUserBoard = React.memo(() => {
    const location = useLocation();
    const editUser = location.state?.data;
    const { user, handleChange, handleSubmit, fetchAccounts, accounts } = useUserhandler(editUser);
    useEffect(() => {
        if (user.role === 'USER')
            fetchAccounts();
    }, [fetchAccounts, user.role,editUser])

    return (
        <div className='w-[95%] relative h-full content bg-white m-3 rounded-xl p-4 flex flex-col'>
            <div className='w-[60%] h-full text-md font-normal'>
                <Form inputs={addUserInputs} values={user} handleChange={handleChange}>

                </Form>

            </div>
            <div className='flex gap-3 justify-end self-end w-1/2'>
                <button className='w-1/3 bg-blue-400 my-12 p-3' type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                <button className='w-1/3 bg-blue-400 my-12 p-3' type='reset'>Reset</button>
            </div>
            { user.role==='USER' &&
                <>
            <div className='text-3xl m-4 font-bold'>Accounts</div>
            <div className='m-4 mx-10 text-lg'>
                {accounts.map(account => {
                    const isChecked = user.accounts?user.accounts.some(a => a.accountId === account.accountId):false;

                    return (
                        <label key={account.accountId} className="flex items-center gap-2 ">
                            <input
                                type="checkbox"
                                name="accounts"
                                checked={isChecked || false}
                                value={account.accountId}
                                data-obj={JSON.stringify(account)}
                                onChange={handleChange}
                            />
                            {account.accountName}
                        </label>
                    );
                })}
            </div></>
            }
        </div>
    )
})

export default AddUserBoard