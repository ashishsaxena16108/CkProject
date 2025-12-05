import React from 'react'
import { addUserInputs } from '../../app/constant.jsx'
import Form from '../../components/Form.jsx'
import useUserhandler from '../../hooks/useUserhandler.jsx'
import { useLocation } from 'react-router-dom'

const AddUserBoard = React.memo(() => {
    const location = useLocation();
    const editUser = location.state?.data || {};
    const {user,handleChange,handleSubmit} = useUserhandler(editUser);
    
    return (
        <div className='w-[95%] relative h-[80%] content bg-white m-3 rounded-xl p-4'>
            <div className='w-[60%] text-md font-normal'>
                <Form inputs={addUserInputs} values={user} handleChange={handleChange} handleSubmit={handleSubmit}>
                    <div className='flex gap-3 justify-end absolute w-1/2 right-[5%]'>
                        <button className='w-1/3 bg-blue-400 my-12 p-3' type='submit'>Submit</button>
                        <button className='w-1/3 bg-blue-400 my-12 p-3' type='reset'>Reset</button>
                    </div>
                </Form>
            </div>
        </div>
    )
})

export default AddUserBoard