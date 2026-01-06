import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ArrowDown from '/arrow_down.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addcostAccount, addresourceAccount, removecostAccount, removeresourceAccount } from '../app/feature/accountReducer';

const ListItem = ({ item, link, open }) => {
    const [isHover, setIsHover] = useState(false);
    const [showData, setShowData] = useState(false);
    const navigate = useNavigate();
    const { accounts, role } = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const selectedAccounts = useSelector(state => {
        if (item.title === 'Cost Explorer') {
            return state.accounts.costaccounts;
        } else {
            return state.accounts.resourceaccounts;
        }
    });
    const getLinkClassName = ({ isActive }) => {
        const activeOrHoverClass = (open && (isActive || isHover)) ? 'bg-blue-100 font-semibold' : '';

        return `flex p-2 m-1 w-full justify-start gap-5 items-center rounded
                ${activeOrHoverClass}`;
    };

    const getIconSrc = ({ isActive }) => {
        return (isActive || isHover) ? item.imghover : item.img;
    };

    const getIconBgClass = ({ isActive }) => {
        return `${(isActive || isHover) && 'bg-blue-400'} p-1 rounded-md`;
    };
    const handleClick = (e) => {
        e.preventDefault();
        navigate(link);
        if (role === 'USER')
            setShowData(!showData);
    }
    const handleChange = (value, checked) => {
        if(item.title==='Cost Explorer'){
            if(checked){
                dispatch(addcostAccount({account:value}));
            }
            else{
                dispatch(removecostAccount({accountId:value}));
            }
        }
        else{
            if(checked){
                dispatch(addresourceAccount({account:value}));
            }
            else{
                dispatch(removeresourceAccount({accountId:value}));
            }
        }

    }
   

    return (
        <div>
            <div className='flex relative'>
                <NavLink
                    to={link}
                    onClick={handleClick}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}

                    className={getLinkClassName}
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={getIconSrc({ isActive })}
                                className={getIconBgClass({ isActive })}
                                alt=""
                                width={40}
                            />
                            <div className={`whitespace-nowrap transition-opacity ${open ? 'opacity-100 duration-500' : 'opacity-0 duration-100'}
                            `}>{item.title}</div>
                        </>
                    )}
                </NavLink>
            </div>
            {(showData && role === 'USER') &&
                <div className='flex flex-col'>
                    {accounts.map((a) => {
                        return <div className='flex items-center gap-3 m-2' key={a.accountId}><input className='h-5 w-5' type="checkbox" name={a.accountId} id={a.accountId} value={a.accountId} checked={selectedAccounts.includes(a.accountId)} onChange={(e)=>handleChange(a.accountId,e.target.checked)}/> <div>{a.accountName}({a.accountId})</div></div>
                    })}
                </div>}
        </div>
    );
}

export default ListItem