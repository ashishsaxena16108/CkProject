import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ArrowDown from '/arrow_down.svg'


const ListItem = ({ item, link, open }) => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();
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
    }
   

    return (
        <div>
            <div className='flex'>
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
            
        </div>
    );
}

export default ListItem